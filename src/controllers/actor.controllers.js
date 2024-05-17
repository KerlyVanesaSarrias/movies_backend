const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const formatBirthday = require('../utils/formatBirthday');
const mapToDTO = require('../utils/mapToDto');

const getAll = catchError(async(req, res) => {
    const results = await Actor.findAll();
    const resultDTO = results.map((actor) => mapToDTO(actor.dataValues))
    return res.json(resultDTO);
});

const create = catchError(async(req, res) => {
    const result = await Actor.create(req.body);

    const transformedResult = {
        ...result.get(),
        birthday: formatBirthday(result.birthday)
    };

    return res.status(201).json(transformedResult);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Actor.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.update(
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