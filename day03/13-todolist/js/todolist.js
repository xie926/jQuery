$(function () {
  load();
  $("#title").keydown(function (event) {
    if (event.keyCode == 13) {
      // alert(1)
      if ($(this).val() === '') {
        alert("请输入您要的操作");
      } else {
        var local = getData();
        local.push({ title: $(this).val(), done: false })
        saveData(local)
        load();
        $(this).val('')
      }
    }
  })
  $("ul,ol").on("click","a",function(){
    var data = getData()
    var index = $(this).attr("id")
    data.splice(index, 1)
    saveData(data)
    load()
    console.log(index)
  })
  $("ul,ol").on("click","input",function(){
    var data = getData()
    var index = $(this).siblings("a").attr("id")
    if($(this).prop("checked")){
      data[index].done = $(this).prop("checked")
      saveData(data)
      load
    }
  })
  function getData() {
    var data = localStorage.getItem("todolist");
    if (data !== null) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }
  function load() {
    // 读取本地存储的数据
    var data = getData();
    console.log(data);
    // 遍历之前先要清空ol里面的元素内容
    $("ol, ul").empty();
    var todoCount = 0; // 正在进行的个数
    var doneCount = 0; // 已经完成的个数
    // 遍历这个数据
    $.each(data, function (i, n) {
      // console.log(n);
      if (n.done) {
        $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
        doneCount++;
      } else {
        $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
        todoCount++;
      }

    });
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);

  }
})