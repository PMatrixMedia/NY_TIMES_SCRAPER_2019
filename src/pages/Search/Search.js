import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";
import {Modal, Button, ModalHeader ,ModalBody, ModalFooter} from "reactstrap";

class Search extends Component {
  constructor (props, context){
    super(props,context);
        
       
        this.state = {
          modal:false,
          articles: [],
          topic: "",
          startYear: "",
          endYear: ""
        };

        this.toggle = this.toggle.bind(this);
}

        toggle() {
          this.setState({
            modal: !this.state.modal
          })
  };


  searchArticles = (event) => {
    event.preventDefault();
    API.findArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => 
          {
          this.setState({articles: res.data.response.docs});
          console.log(this.state.articles);
        }
        )
        .catch( err => console.log(err));
  };

  saveArticleSubmit = (headline, link, date) => {
    console.log("Working");
      API.saveArticle({
        headline: headline,
        link: link,
        date: date
      })
        .then(res => console.log("saved article"))
        .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        return (
          <Container fluid>
          <Row>
            <Col size="md-12">
            <div className="panel panel-primary">
            <div className="panel-heading"><h4>Query</h4></div>
            <div className="panel-body"> 
                <form>
                  <h4>Topic</h4>
                  <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="topic"
                />
                <h4>Start Year</h4>
                <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="startYear"
                />
                <h4>End Year</h4>
                <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="endYear"
                />
                  <FormBtn
                  disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                  onClick={this.searchArticles}
                  onClick={this.toggle}
                  >
                  Submit
                  </FormBtn>
                  </form>
              </div>
              </div>
              </Col>
            </Row>
                <h3><em>Enter Search Criteria to Begin</em></h3>
                <Modal isOpen={this.state.modal} toggle={this.toggle}className={this.props.article}>
                <ModalHeader toggle={this.toggle} close={closeBtn}>
                    Search Results
                </ModalHeader>
                <ModalBody>
                {this.state.articles.length ? (
                        <List>
                          {this.state.articles.map(article => (
                            <ListItem
                              key={article._id}
                              headline={article.headline.main}
                              link={article.web_url}
                              date={article.pub_date}
                            >
                            <SaveBtn onClick={() => this.saveArticleSubmit(article.headline.main, article.web_url, article.pub_date)}></SaveBtn>
                            </ListItem>))}
                        </List>
                        ) : (
                            <ul className="list-group">
                            <li className="list-group-item"></li>
                            </ul>
                        )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.toggle}>Close</Button>    
                </ModalFooter>
                </Modal>
          </Container>    
        )}};

export default Search;
