const $ref = {
    comments:$("#commentsSection"),
  }
  
  $(document).ready(function(){
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .then(function(data) {
      console.log(data);
    })
  })
  
  $(document).on("click", ".commentsBtn", function() {
    populateComments($(this).parent().attr("id"))
  })
  
  // Add new comment
  $(document).on("click", ".addCommentBtn", function(event) {
    event.preventDefault()
    let thisId = $(this).attr("id").replace("comment-","")
    let data= {
      title: $("#commentTitle").val(),
      text: $("#commentText").val()
    }
  
    $.ajax({
      method: "POST",
      url: `/articles" + ${thisId}`,
      data: data
    })
        .then((data) => {
            console.log(data)
            $("#commentTitle").val()
            $("#commentText").val()
            populateComments(thisId)
        })
  })
  
  $(document).on("click", ".delComment", function() {
    let data = {
      comment_id : $(this).data("comment"),
      article_id : $(this).data("article")
    }
    $.ajax({
      method: "DELETE",
      url: "/articles",
      data: data
    })
    .then((res) => {
      console.log(res)
      populateComments(data.article_id)
    })
    .catch((error) => {
      console.log(error)
      populateComments(data.article_id)
    })
  })
  
  function populateComments(id){
    $ref.comments.empty()
    $([document.documentElement, document.body]).animate({
      scrollTop: $ref.comments.offset().top - 75
  }, 500)
  
    $.ajax({
      method: "GET",
      url: `/articles/${id}`
    })
    .then((data) => {
      console.log(data.comments);
      let commentString = (`<div class="jumbotron"><h2>Comments</h2>`)
      if(data.comments){
        for(let comment of data.comments){
          commentString+=(`<div class="comment">`+
                                  `<span class="delComment" data-article="${id}" data-comment="${comment._id}" aria-hidden="true">&times;</span>`+
                                  `<h4>${comment.title}</h4>`+
                                  `<p>${comment.text}</p>`+
                               `</div>`)
        }
      }
  
      commentString+=(`<form>
        <div class="form-group">
          <label for="commentTitle">Comment Title:</label>
          <input type="text" maxlength="20" class="form-control inputBox" autocomplete="off" id="commentTitle" aria-describedby="newCommentTitle">
        </div>
        <div class="form-group">
          <label for="commentText">Comment Text:</label>
          <textarea type="text" maxlength="180" class="form-control inputBox"  autocomplete="off"id="commentText" aria-describedby="newCommentText"></textarea>
        </div>
        <button type="submit" class="btn btn-outline-primary addCommentBtn" id="comment-${thisId}">Submit</button>
      </form>`)
      commentString+=(`</div>`)
      $ref.comments.append(commentString)
    })
  }