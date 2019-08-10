import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../../../state/posts';
import { MainLayout } from '../../layouts';

class PostPage extends Component {
  static async getInitialProps({ req, res }) {
    const { store } = req;
    await store.dispatch(postActions.fetchAll());
    return store.getState();
  }

  componentDidMount() {
    const { fetchAll } = this.props;
    fetchAll();
  }

  render() {
    const { allPosts } = this.props;

    return (
      <MainLayout>
        <h1>Latest posts</h1>
        {allPosts.length &&
          allPosts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <div>{post.body}</div>
            </div>
          ))}
      </MainLayout>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    allPosts: posts.allPosts,
  };
};

const mapActionsToProps = {
  fetchAll: postActions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PostPage);
