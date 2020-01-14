export const DELETE_SERVICE = 'DELETE_SERVICE';
export const CREATE_SERVICE = 'CREATE_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';

export const deleteService = serviceId => {
  return {type: DELETE_SERVICE, sid: serviceId};
};

export const createService = (title, description, imageUrl, price) => {
  return {
    type: CREATE_SERVICE,
    serviceData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateService = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_SERVICE,
    sid: id,
    serviceData: {
      title,
      description,
      imageUrl,
    },
  };
};
