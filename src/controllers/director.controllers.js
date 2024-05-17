const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const formatBirthday = require('../utils/formatBirthday');
const mapToDTO = require('../utils/mapToDto');

const getAll = catchError(async(req, res) => {
    const results = await Director.findAll();
    const resultDTO = results.map((director) => mapToDTO(director.dataValues))
    return res.json(resultDTO);
});

const create = catchError(async(req, res) => {
    const result = await Director.create(req.body);

    const transformedResult = {
        ...result.get(),
        birthday: formatBirthday(result.birthday)
    };

    return res.status(201).json(transformedResult);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Director.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}