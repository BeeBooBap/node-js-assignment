jest.mock('../controllers/space');
const spaceController = require('../controllers/space');

describe('Get Mars Rover Data', () => {
    it('Returns data from the mars rover', async () => {
        const id = await spaceController.getMarsRover();
        expect(id).toEqual('102693');
    });
});


