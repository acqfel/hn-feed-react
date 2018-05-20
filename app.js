//const API = 'https://hn.algolia.com/api/v1/search_by_date?query=';
//const DEFAULT_QUERY = 'redux';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      hits: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("https://hn.algolia.com/api/v1/search_by_date?query=javascript&tags=story&page=0&hitsPerPage=20")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
    .then(data => this.setState({ hits: data.hits, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
    }

  render() {
      return <ViewComponent { ...this.props} { ...this.state} />;
    }

}

const ViewComponent = ({ error, isLoading, hits }) => {
    //const { error, isLoading, hits } = this.state;

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>{error.message}</p>;
    }

    return (
      <div>
        <ul>
            {hits.map(hit =>
              <li key={hit.objectID}>
                <a href={hit.url}>{hit.title}</a>
                <br />
                <span>{"Author: "+hit.author}</span>
                <br />
                <span>{"Points: "+hit.points}</span>
                <hr />
              </li>
            )}
        </ul>
      </div>
    );
};

ReactDOM.render(
    <MyComponent />,
  document.getElementById('root')
);
