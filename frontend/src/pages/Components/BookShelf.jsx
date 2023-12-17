import '../style/BookShelf.scss';

const Bookshelf = () => {
  return (
    <div className="bookshelf">
      <div className="book">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg"
          alt="book cover"
        />
        <h3>The Hobbit</h3>
        <p>J.R.R. Tolkien</p>
      </div>
      <div className="book">
        <img
          src="https://source.unsplash.com/1920x2950/?nature"
          alt="book cover"
        />
        <h3>The Great Gatsby</h3>
        <p>F. Scott Fitzgerald</p>
      </div>
      <div className="book">
        <img
          src="https://picsum.photos/1920/2950"
          alt="book cover"
        />
        <h3>To Kill a Mockingbird</h3>
        <p>Harper Lee</p>
      </div>
    </div>
  );
};

export default Bookshelf;