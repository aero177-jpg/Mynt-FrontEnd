import React from "react";
import { getPostsByKatID, opprettNyPost } from "../services/budsjettpost";
import AddPost from "../primitives/addPost";
import EditKat from "../primitives/editDeleteElements";
import EditDeleteMenu from "../primitives/edDelMenu";
import { ListPosts } from "../primitives/list";

import { PrimaryButton, Horiz, PutinCorner } from "../App-Styles";

export default class Katdiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSum: "",
      activePost: "",
      isLoading: false,
      error: null,
      allPostsByID: [],
      post: {
        tittel: "",
        ID: "",
      },
    };
  }

  async componentDidMount() {
    await this.populatePosts();
    // console.log(this.state.allPostsByID)
    // console.trace('hei');
    this.props.setSum(this.state.totalSum);
  }

  renderPosts(posts) {
    this.setState({ allPostsByID: posts });
    // console.log(this.state.allPostsByID)
  }
  getTotalSum(posts) {
    const summedUp = posts.reduce((a, b) => a + (parseInt(b.sum) || 0), 0);
    this.setState({ totalSum: summedUp });
  }
  async populatePosts() {
    const katid = this.props.katid;
    // console.log(this.props.katid, this.props.named)

    try {
      this.setState({ isLoading: true });
      const posts = await getPostsByKatID(katid);
      this.renderPosts(posts);
    } catch (error) {
      this.setState({ error });
    }
    this.getTotalSum(this.state.allPostsByID);
  }

  render() {
    const id = this.props.katid;
    const { allPostsByID } = this.state;
    const postsElementer = allPostsByID.map(({ tittel, sum, ID }) => {
      return <ListPosts key={ID} sum={sum} tittel={tittel} />;
    });
    return (
      <div>
        <AddPost katid={id} />
        {postsElementer}
      </div>
    );
  }
}
