import { types } from "mobx-state-tree";

export const userInfoModel = types.model({
  email: types.maybeNull(types.string),
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  currency: types.maybeNull(types.string),
});

export const locationDetailsModel = types.model({
  country: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  area: types.maybeNull(types.string),
  address: types.maybeNull(types.string),
});

export const filesModel = types.model({
  file: types.maybeNull(types.string),
  fileType: types.maybeNull(types.string),
});

export const packagesModal = types.model({
  title: types.maybeNull(types.string),
  totalSession: types.maybeNull(types.number),
  sessionDuration: types.maybeNull(types.number),
  costPerSession: types.maybeNull(types.number),
  description: types.maybeNull(types.string),
  isPublished: types.maybeNull(types.number),
  grandTotal: types.maybeNull(types.number),
  currency: types.maybeNull(types.string),
  coachingType: types.maybeNull(types.string),
  locationType: types.maybeNull(types.string),
  longitude: types.maybeNull(types.string),
  latitude: types.maybeNull(types.string),
  averageRating: types.maybeNull(types.number),
  totalReviews: types.maybeNull(types.number),
  validity: types.maybeNull(types.number),
  discount: types.maybeNull(types.number),
  locationDetails: types.maybeNull(locationDetailsModel),
  files: types.maybeNull(types.array(filesModel)),
});


export const categoriesDataModel = types.model({
  id: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
});