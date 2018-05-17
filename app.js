//const API = 'https://hn.algolia.com/api/v1/search_by_date?query=';
//const DEFAULT_QUERY = 'redux';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hits: []
    };
  }

  componentDidMount() {
    fetch("https://hn.algolia.com/api/v1/search_by_date?query=javascript&tags=story&page=0&hitsPerPage=20")
    .then(response => response.json())
    .then(data => this.setState({ hits: data.hits }));
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
    }

  render() {
      const { hits } = this.state;

      return (
        <div>
          <ul>
              {hits.map(hit =>
                <li key={hit.objectID}>
                  <a href={hit.url}>{hit.title}</a>
                </li>
              )}
          </ul>
        </div>
      );
    }

}

ReactDOM.render(
    <MyComponent />,
  document.getElementById('root')
);
