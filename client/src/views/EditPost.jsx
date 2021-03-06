import React from 'react'
import axios from 'axios'

class EditPost extends React.Component{
  state={
    post: null,
    fields: { title: '', body: '', item: '', exchangeFor:'', location:'',image:'', cashValue:''}
  }

//When the component mounts
  componentDidMount(){
    //Immediately store the important information from the params
    const location = this.props.match.params.location
    const id = this.props.match.params.id
    //get current post information from server, using this information
    axios({method: 'get', url:`/api/posts/${location}/${id}`})
    .then((post)=>{
      //then set the state using this information
      this.setState({
        post: post.data,
        fields:{ ...post.data}
      })
    })
  }
  onInputChange(evt){
    //change fields on input change
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault()
    //send a patch request using our fields
    axios({method: 'patch',url:`/api/posts/${this.state.fields.location}/${this.state.post._id}`, data:{
          ...this.state.fields
    }})
    //then pushes the user into the post view
    .then((post)=>{
      this.props.history.push(`/posts/${post.data.updatedPost.location}/${post.data.updatedPost._id}`)			
    })
  }
    
  onDeleteClick(){
    axios({method: 'delete', url:`/api/posts/${this.state.post.location}/${this.state.post._id}`})
    .then((post)=>{
      this.props.history.push(`/profile/${this.state.post.userId}`)
    })
  }

  render(){
    //if there is no post yet, tell them we're loading content
      if (!this.state.post){
        return(
          <div>
            <h1>Loading content, please wait!</h1>
          </div>
        )
      }
      //otherwise dynamically display the form, using the information we got earlier!
      // line84 makes use of drop down display to show different locations
      //line97-108 makes use of drop down display to show different categories
      else{
        const {title, body, item, exchangeFor, location, image, cashValue} = this.state.fields
        return(
          <div className="col-sm-6 col-sm-offset-6"id="middle">
            <h1>Edit the Post!</h1>
            <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Title*" name="title" defaultValue={title} />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Item*" name="item" defaultValue={item} />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Exchange For*" name="exchangeFor" defaultValue={exchangeFor} />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:  </label>
                <select name="location">
                  <option value="LosAngeles">Los Angeles</option>
                  <option value="SantaMonica">Santa Monica</option>
                  <option value="Mordor">Mordor</option>
                  <option value="NeverNeverLand">Never Never Land</option>
                  <option value="Hogwarts">Hogwarts</option>
                  <option value="testLoc">testLoc</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Category:  </label>
                <select name="image">
                  <option value="Art">Art</option>
                  <option value="Auto">Auto / Auto Parts</option>
                  <option value="Bike">Bikes</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Games">Games</option>
                  <option value="Guitar">Music / Instruments</option>
                  <option value="Photography">Photography</option>
                  <option value="Toys">Kids Toys</option>
                </select>					  
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="optional cash value" name="cashValue" defaultValue={cashValue} />
              </div>
              <div className="form-group">
                <textarea className="form-control"rows='5' cols='25' placeholder="body" name="body" defaultValue={body} />
              </div>
                <button className="btn btn-submit btn-sm">Barter!</button>
            </form>
              <button className="btn btn-submit btn-sm" onClick={this.onDeleteClick.bind(this)}>DELETE</button>
          </div>
        )
      }
  }
}

export default EditPost