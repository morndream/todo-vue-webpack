import '../assets/styles/footer.styl'
export default{
  data(){
    return {
       author:'PengYu'
    }
  },
  render(){
    return (
      <div id="footer">
        <span>Wirtten by {this.author}</span>
      </div>
    )
  }
}