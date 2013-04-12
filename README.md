yearPlannerJS\_for\_Illustrator
======================

Adobe Illustratorに読み込むと、年間予定表が出力されるスクリプトです。

動作確認
-------
Adobe Illustrator CS5

使い方
------
1. [yearPlannerJS\_for\_Illustratorのzipファイル](https://github.com/fuyukoma/yearPlannerJS_for_illustrator/archive/master.zip)をダウンロードする
2. zipファイルを解凍し、year_planner.jsをエディタで開く
3. year_planner.jsの1〜14行目に書かれているUser Settingを適当に変更する  
    // User Setting  
    startYear = 2013; // 開始年  
    startMonth = 4; // 開始月  
    endYear = 2015; // 終了年  
    endMonth = 3;  // 終了月  
    // Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6  
    keyDay = 4; // 週の区切りにしたい曜日の番号（4だと木曜区切り）  
    
    color1 = setColor(75.56, 64.33, 60.16, 16.13); // 線の色等で使っている色（青）  
    color2 = setColor(0, 0, 0, 0); // 年と月の文字の色（白）  

4. Adobe Illustratorを開き、  
ファイル＞スクリプト＞その他のスクリプト  
を選択し、解凍したフォルダの中にあるyear_planner.jsを選択する
5. 名前を付けて保存する

保存前に、プラスアルファでカスタマイズしてもいいと思います。
