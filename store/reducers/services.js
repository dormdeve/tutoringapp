import SERVICES from '../../data/dummy-data';
import {
  DELETE_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
} from '../actions/services';
import Service from '../../models/service';

const initialState = {
  availableServices: SERVICES,
  userServices: SERVICES.filter(serv => serv.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SERVICE:
      const newService = new Service(
        new Date().toString(),
        'u1',
        action.serviceData.title,
        action.serviceData.imageUrl,
        action.serviceData.description,
        action.serviceData.price
      );
      return {
        ...state,
        availableServices: state.availableServices.concat(newService),
        userServices: state.userServices.concat(newService),
      };
    case UPDATE_SERVICE:
      const serviceIndex = state.userServices.findIndex(
        serv => serv.id === action.sid
      );
      const updatedService = new Service(
        action.sid,
        state.userServices[serviceIndex].ownerId,
        action.serviceData.title,
        action.serviceData.imageUrl,
        action.serviceData.description,
        state.userServices[serviceIndex].price
      );
      const updatedUserServices = [...state.userServices];
      updatedUserServices[serviceIndex] = updatedService;
      const availableServiceIndex = state.availableServices.findIndex(
        serv => serv.id === action.sid
      );

      const updatedAvailableServices = [...state.availableServices];
      updatedAvailableServices[availableServiceIndex] = updatedService;
      return {
        ...state,
        availableServices: updatedAvailableServices,
        userServices: updatedUserServices,
      };

    case DELETE_SERVICE:
      return {
        ...state,
        userServices: state.userServices.filter(
          service => service.id !== action.sid
        ),
        availableServices: state.availableServices.filter(
          service => service.id !== action.sid
        ),
      };
  }
  return state;
};
