/*global $*/
$(document).ready(function() {
  
  let num1 = null; //1番目の数値
  let num2 = null; //2番目の数値
  let operator = null; //演算子格納
  let ope_count = 0; //演算子重複防止
  let dec_count = 0; //小数点重複防止
  let dec = false; //小数点の入力条件
  let minus = false; //マイナス値から計算する時に使用
  
  function Calc() {
    switch (operator) {
      case '+':
        num1 = Number(num1) + Number(num2);
        break;
      case '-':
        num1 = Number(num1) - Number(num2);
        break;
      case '*':
        num1 = Number(num1) * Number(num2);
        break;
      case '/':
        num1 = Number(num1) / Number(num2);
        break;
    }
  }
  
  $(".value").click(function() {
    // 最初のキー入力をチェックする処理
    if (num1 == null && operator == null) {
      const ope_check = ['+', '*', '/', '.', '0', '00'];
      if (ope_check.includes($(this).text())) {
        num1 = null;
        num2 = null;
        operator = null;
        ope_count = 0;
        minus = false;
        return;
      }else{
        if ($(this).text() == '-') {
          minus = true;
          num1 = "-";
        }
      }
    }
    // 数値が入力された時の処理
    if ($(this).attr('class') == 'value num') {
      ope_count = 0; //演算子カウントクリア
      dec = true; //小数点を入力可能に
      
      if (minus) {
        num1 = num1 + $(this).text();
        $(".display").text($(".display").text() + $(this).text());
        minus = false;
        return;
      }
      if(num1 == null && operator == null) {
        $(".display").text($(".display").text() + $(this).text());
        num1 = $(this).text();
      }else if (num1 != null && operator == null) {
        $(".display").text($(".display").text() + $(this).text());
        num1 = num1 + $(this).text();
      }else if (num2 == null && operator != null) {
        $(".display").text($(".display").text() + $(this).text());
        num2 = $(this).text();
      }else if (num2 != null && operator != null) {
        $(".display").text($(".display").text() + $(this).text());
        num2 = num2 + $(this).text();
      }else {
        return;
      }
    // 演算子が入力された時の処理
    }else if ($(this).attr('class') == 'value ope'){
      dec_count = 0; //小数点カウントクリア
      dec = false; //小数点を入力不可に
      
      ope_count += 1;
      if (ope_count > 1) {
        ope_count = 1;
      }else if (ope_count == 1 && num1 != null && num2 == null) {
        operator = $(this).text();
        $(".display").text($(".display").text() + $(this).text());
      }else if (ope_count == 1 && num1 != null && num2 != null) {
        operator = $(this).text();
        Calc();
        num2 = null;
        $(".display").text($(".display").text() + $(this).text());
        
      }else {
        return;
      }
    // 小数点が入力された時の処理__
    }else {
      ope_count = 1; //演算子を入力不可に
      
      dec_count += 1;
      if (dec_count > 1) {
        dec_count = 1;
      }else if (dec_count == 1 && dec == true && num1 != null && num2 == null) {
        num1 = num1 + $(this).text();
        $(".display").text($(".display").text() + $(this).text());
      }else if (dec_count == 1 && dec == true && num1 != null && num2 != null) {
        num2 = num2 + $(this).text();
        $(".display").text($(".display").text() + $(this).text());
      }else {
        return;
      }
    }
  });

  $("#reset").click(function() {
    num1 = null;
    num2 = null;
    operator = null;
    ope_count = 0;
    dec_count = 0;
    dec = false;
    minus = false;
    $(".display").text('');
  });
  
  $("#result").click(function() {
    Calc();
    $(".display").text(num1);
    num2 = null;
    ope_count = 0;
  });
});