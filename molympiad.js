javascript: (function() {

    //Lấy nội dung bài viết nằm trong thẻ <div> có class là post-body-inner
    var exam = document.querySelector(".post-body-inner ol");

    //Xử lí các vidu tương ứng với các thẻ <li>
    exam.querySelectorAll("li").forEach(function(vidu, index) {
        //Xoá các thẻ <span>, <div> có class bắt đầu bằng MathJax
        vidu
            .querySelectorAll("[class^=MathJax]")
            .forEach((mathJax) => mathJax.remove());

        //Xử lí các công thức toán nằm trong thẻ <script> của mỗi vidu
        vidu.querySelectorAll("script").forEach(function(script) {
            //Kiểm tra công thức ở dạng display hay inline
            let bound = script.type === "math/tex; mode=display" ? "$$" : "$";
            script.outerHTML = bound + script.innerHTML + bound;
        });

        //Bao mỗi câu hỏi trong thẻ <li> bằng môi trường vidu và kèm thêm comment
        let comment = %%%=============%20VD/BT ${index%20+%201} =============%%%\n;
        vidu.outerHTML = ${comment}\\begin{vidu}\n${vidu.innerHTML}\n\\end{vidu}\n;
    });

    //Lấy nội dung mã TeX sau khi xử lí
    let TeX = exam.innerHTML;
    //lọc và sửa nhưng sự khác nhau giữa mathjax và latex
    const replacements = {
        "&lt;": "<",
        "&gt;": ">",
        "<br>": "\n",
        "&nbsp;": " ",
        "&amp;": "&"
    };
    for (let key in replacements) {
        let regex = new RegExp(key, "g");
        TeX = TeX.replace(regex, replacements[key]);
    }

    //Tiến hành tải file dưới dạng ".tex"
    let fileName = document.title;
    let blob = new Blob([TeX], {
        type: "text/plain; charset =utf-8"
    });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + ".tex";
    link.click();
})();
