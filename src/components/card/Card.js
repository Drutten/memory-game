import './Card.css';

const Card = ({
  card: { id, imageUrl, imageUrlBack, imageId, isOpen, isClickable },
  selectCard,
}) => {
  const imageName = imageUrl.split('/').pop().split('.')[0];

  const handleClick = () => {
    if (isClickable) {
      selectCard({ id, imageUrl, imageUrlBack, imageId, isOpen, isClickable });
    }
  };

  return (
    <div className={ `Card ${isClickable ? 'clickable' : ''}` } onClick={ handleClick }>
      <img
        src={ imageUrl }
        alt={ imageName }
        className={ isOpen ? 'displayed' : 'not-displayed' }
      />
      <img
        src={ imageUrlBack }
        alt='back'
        className={ !isOpen ? 'displayed' : 'not-displayed' }
      />
    </div>
  );
}

export default Card;
