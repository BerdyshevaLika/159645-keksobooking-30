const offerTypeToTitle = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');

const renderFeatures = (card, offerFeatures) => {
  const featuresList = card.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    const isNecessary = offerFeatures.some((feature) =>
      featureItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureItem.remove();
    }
  });
};

const renderPhotos = (card, offerPhotos) => {
  const photosList = card.querySelector('.popup__photos');
  offerPhotos.forEach((photoUrl) => {
    const photo = card.querySelector('.popup__photo').cloneNode(true);
    photo.src = photoUrl;
    photosList.append(photo);
  });
  card.querySelectorAll('.popup__photo')[0].remove();
};

const createCard = ({ offer, author }) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = offerTypeToTitle[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if(offer.features) {
    renderFeatures(card, offer.features);
  } else {
    card.querySelector('.popup__features').classList.add('hidden');
  }

  if(offer.description) {
    card.querySelector('.popup__description').textContent = offer.description;
  } else {
    card.querySelector('.popup__description').classList.add('hidden');
  }

  if(offer.photos) {
    renderPhotos(card, offer.photos);
  } else {
    card.querySelector('.popup__photos').classList.add('hidden');
  }

  card.querySelector('.popup__avatar').src = author.avatar;

  return card;
};

export { createCard };
