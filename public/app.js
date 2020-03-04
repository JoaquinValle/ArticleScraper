const $ref = {
    comments:$("#all-comments"),
  }
  
  $(document).ready(() => {
    $.ajax({method: "GET", url: "/scrape"}).then((data) => {
      console.log(data);
    })
  })
  
  $(document).on("click", "#com-btn", function() {
    console.log($(this).parent())
    enable($(this).parent().attr("id"))
  })
  
  $(document).on("click", ".addCommentBtn", function(event) {
    event.preventDefault()
    let commentId = $(this).attr("id").replace("comment-","")
    let data= {
      title: $("#comment-name").val(),
      text: $("#comment-info").val()
    }
  
    $.ajax({
      method: "POST",
      url: `/articles/${commentId}`,
      data: data
    })
        .then(() => {
            $("#comment-name").val()
            $("#comment-info").val()
            enable(commentId)
        })
  })
  
  $(document).on("click", ".delete", function() {
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
      enable(data.article_id)
    })
    .catch((err) => {
      console.log(err)
      enable(data.article_id)
    })
  })
  
  function enable(id){
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
                                  `<span class="delete" data-article="${id}" data-comment="${comment._id}" aria-hidden="true">&times;</span>`+
                                  `<h4>${comment.title}</h4>`+
                                  `<p>${comment.text}</p>`+
                               `</div>`)
        }
      }
  
      commentString+=(`<form>
        <div class="form-group">
          <label for="comment-name">User Name:</label>
          <input type="text" maxlength="20" class="form-control inp" id="comment-name" aria-describedby="comment-name">
        </div>
        <div class="form-group">
          <label for="comment-info">Comment Text:</label>
          <textarea type="text" maxlength="180" class="form-control inp" id="comment-info" aria-describedby="comment-info"></textarea>
        </div>
        <button type="submit" class="btn btn-fix addCommentBtn" id="comment-${id}">Submit</button>
      </form>`)
      commentString+=(`</div>`)
      $ref.comments.append(commentString)
    })
  }