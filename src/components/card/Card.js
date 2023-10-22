import './Card.css';

const Card = ({ card, imageUrlBack }) => {
  const {imageUrl, imageId} = card;
  const imageNameStart = imageUrl.lastIndexOf('/');
  const imageName = imageUrl.substring(imageNameStart + 1, imageUrl.lastIndexOf('.'));
  console.log(imageName);
  return (
    <div className='Card'>
      <img src={ imageUrl } alt={ imageName } height='140' />
    </div>
  );
}

export default Card;
