//variables
let score = 0;
let marked = false;
let shownIndex = 1;
let answerList = [];
let correctList = [3, 0, 4, 2, 3];
for (var i = 0; i < 5; i++)
    answerList.push(0);

$(function () { // onload

    //answer clicked
    $(".quiz-option").click(function () {
        if (!marked) {
            let questionNum = $(this).parent("li").attr("id");
            questionNum = questionNum[questionNum.length - 1];

            let optionNum = $(this).data("option");

            answerList[questionNum - 1] = optionNum;

            $(this).siblings(".quiz-option").removeClass("selected");
            $(this).siblings(".quiz-option").css("opacity", .6);
            $(this).addClass("selected");
            $(this).css("opacity", 1);

            $(this).removeClass("unselected");
            $(this).siblings(".quiz-option").removeClass("unselected");
        }
    });

    //next question clicked
    $(".next").click(function () {
        if (shownIndex == 5) {
            if (!marked)
                correct();
            else
                showQuestion(shownIndex);
        } else {
            showQuestion(++shownIndex);
        }
    });

    //previous question clicked
    $(".prev").click(function () {
        if (shownIndex > 1)
            showQuestion(--shownIndex);
    });

    //jump to certain question
    $(".dot").click(function () {
        let idNum = $(this).attr('id');
        idNum = idNum[idNum.length - 1];

        shownIndex = idNum;
        showQuestion(idNum);
    });

    //button to rate the quiz
    $("#rate-button").click(function () {
        $("#quiz-wrapper").hide();
        $("#score").hide();
        $("#rating-wrapper").show();
    });

    //detects the change of the slider
    $("#rating-slider").change(function () {
        $("#rating-slider-value").text($("#rating-slider").val());
    });

     //submit rate form
    $("#rating-submit").click(function () {
        $("#rating-wrapper").hide();
        $("#complete-heading").append("We will be looking to add more " +
            $("input[name=question]:checked").val() +
            " questions!");
        
        if ($("#rating-comment").val() != "") { //changes the number based on the slider value
            $("#comment-text").html("&ldquo;" + $("#rating-comment").val() + "&ldquo;");
            $("#additional-comments").show();
        }
        $("#complete").show();
    });
});

//shows the specific question
function showQuestion(qNum) { 
    if (qNum == 1)
        $(".prev").addClass("inactive");
    else
        $(".prev").removeClass("inactive");

    if (qNum == 5 && !marked)
        $(".next").text("finish");
    else {
        $(".next").text("next");
        if (qNum == 5)
            $(".next").addClass("inactive");
        else
            $(".next").removeClass("inactive");
    }
    let qLi = "#q" + qNum;

    $("li").hide();
    $(qLi).show();

     //removes dot colouring
    $(".dot").removeClass("dot-active");
    $(".dot").removeClass("dot-correct-active");
    $(".dot").removeClass("dot-wrong-active");
    if (!marked) {
        $("#d" + qNum).addClass("dot-active");
    } else {
        if ($("#d" + qNum).hasClass("dot-correct")) {
            $("#d" + qNum).addClass("dot-correct-active");
        } else {
            $("#d" + qNum).addClass("dot-wrong-active");
        }
    }
}

//corrects answers
function correct() {
    marked = true;
    for (let i = 1; i <= 5; i++) {
        $("#q" + i + " .option" + correctList[i - 1]).addClass("option-correct");
        $("#q" + i + " .quiz-option").removeClass("unselected");
        if (answerList[i - 1] == correctList[i - 1]) {
            score++;
            $("#d" + i).addClass("dot-correct");
        } else if (answerList[i - 1] == 0) { //turn right one green then show wrong answer
            $("#d" + i).addClass("dot-wrong");
        } else {
            $("#q" + i + " .option" + answerList[i - 1]).addClass("option-wrong");
            $("#d" + i).addClass("dot-wrong");
        }
    }
    showQuestion(shownIndex);

    showScore();
}

//displays the code
function showScore() {
    $("#score-text").append(score + " / 5" + " | " + score * 100 / 5 + "%");
    $("#score").show();
}
