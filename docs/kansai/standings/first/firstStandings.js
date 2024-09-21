const season = "2024年秋季";
const teamNum = 6;
const teams = ["龍谷大学A", "京都大学A", "大阪公立大A", "京都大学B", "同志社大学A", "京阪神ジェネシス"];

const winPoint = 5;
const drawPoint = 3;
const losePoint = 1;

function checkClick(){
    html2canvas(document.getElementById("target")).then(canvas => {
        document.body.appendChild(canvas)
        canvas.id = "canvas"
    });
}

function downloadClick(){
    let canvas = document.getElementById("canvas");
    const name = 'firststandings.png';
    const a = document.createElement('a');

    a.href = canvas.toDataURL();
    a.download = name;
    a.click();
}

// 非同期処理を実行する async 関数を定義
async function loadAndAddFont() {
    const exampleFontFamilyName = "Zen Kaku Gothic New"; // 取得したいGoogleフォント名
    const googleApiUrl = "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&display=swap";
  
    try {
        // フォント CSS を取得
        const response = await fetch(googleApiUrl);
        if (response.ok) {
            // CSSの内容を取得
            const cssFontFace1 = await response.text();
    
            // URLを抽出するために正規表現を使用
            const matchUrls = cssFontFace1.match(/url\(([^)]+)\)/g);
            if (!matchUrls) throw new Error("フォントが見つかりませんでした");
  
            for (const url of matchUrls) {
            // url() の中の URL を取得
            const fontUrl = url.slice(4, -1).replace(/['"]/g, ''); // url("...") から "..." を取り出す
    
            // FontFace を作成し、フォントを追加する
            const font = new FontFace(exampleFontFamilyName, `url(${fontUrl})`);
            await font.load();
            document.fonts.add(font);
            }
        } else {
            throw new Error("フォントの読み込みに失敗しました");
        }
    } catch (error) {
      console.error(error);
    }
}

// async 関数を呼び出す
loadAndAddFont();
create();

for (var i = 0; i < teamNum; i++) {
    for (var j = 0; j < teamNum; j++) {
        let newOption = new Option(teams[j], teams[j]);
        document.getElementById('team' + i).append(newOption);
    }
}

const canvas = document.querySelector('.canvas'); // canvasの取得
let imagePath = "firstStandingsBackground.jpg"; // 背景画像の取得
const ctx = canvas.getContext("2d"); // ctxの取得
let today = new Date(); // 現在の日付を取得
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let now = year + "年" + month + "月" + day + "日時点"; // 日付フォーマット
let title = "関西キャップリーグ1部 " + season + "順位表";

const image = new Image();
changeClick();

function changeClick() {
    image.addEventListener("load",function (){
        ctx.clearRect(0, 0, 1920, 1080)
        ctx.drawImage(image, 0, 0, 1920, 1080); // 背景画像の描画
        ctx.globalCompositeOperation = "source-over"; // デフォルト
        ctx.shadowColor = "#555"; // 影設定
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "65px Zen Kaku Gothic New";
        ctx.textAlign = "left"
        ctx.fillText(title, 425, 150); // タイトルの描画
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(425, 155, 1210, 3); // タイトル下線部の描画
        ctx.shadowColor = "#000"; // 影設定リセット
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.font = "50px Zen Kaku Gothic New";
        ctx.fillText(now, 1500, 1070); // 現在の日付の描画

        let teamLank = [];
        let teamWin = [];
        let teamLose = [];
        let teamDraw = [];
        let teamGame = [];
        let teamPoint = [];

        for (var i = 0; i < teamNum; i++) {
            if (document.getElementById('team' + i).value != null && document.getElementById('teamWin' + i).value != null && document.getElementById('teamLose' + i).value != null && document.getElementById('teamDraw' + i).value != null) {
                teamLank.push(document.getElementById('team' + i).value);
                teamWin.push(Number(document.getElementById('teamWin' + i).value));
                teamLose.push(Number(document.getElementById('teamLose' + i).value));
                teamDraw.push(Number(document.getElementById('teamDraw' + i).value));
            } else {

            }
        }

        for (var i = 0; i < teamNum; i++) {
            teamGame.push(teamWin[i] + teamLose[i] + teamDraw[i]);
            teamPoint.push(teamWin[i] * winPoint + teamLose[i] * losePoint + teamDraw[i] * drawPoint);
        }

        ctx.fillStyle = "#000000";
        ctx.font = "100px Zen Kaku Gothic New";

        for (var i = 0; i < teamNum; i++) {
            ctx.textAlign = "left";
            ctx.fillText(teamLank[i], 260, 370 + (127 * i));
            ctx.textAlign = "center";
            ctx.fillText(teamGame[i], 1137, 370 + (127 * i));
            ctx.fillText(teamWin[i], 1302, 370 + (127 * i));
            ctx.fillText(teamLose[i], 1470, 370 + (127 * i));
            ctx.fillText(teamDraw[i], 1638, 370 + (127 * i));
            ctx.fillText(teamPoint[i], 1806, 370 + (127 * i));
        }
    });
    image.src = imagePath;
}

function create() {
    for (var i = 0; i < teamNum; i++) {
        document.write('<label>' + Number(i + 1) +'位チーム：<select id="team' + i +'"></select></label>');
        document.write('<label>勝:<input type="number" id="teamWin' + i + '" step="1"></label>');
        document.write('<label>負:<input type="number" id="teamLose' + i + '" step="1"></label>');
        document.write('<label>分:<input type="number" id="teamDraw' + i + '" step="1"></label><br>');   
    }
    document.write('<Button onClick="changeClick()">変更(はじめに押す)</Button>')
    document.write('<Button onClick="checkClick()">確認(2番目に押す)</Button>')
    document.write('<Button onClick="downloadClick()">ダウンロード(最後に押す)</Button><br>')
    document.write('<canvas class="canvas" width="1920" height="1080"></canvas>');
}

// let changeButton = document.getElementById('changeButton');
// changeButton.addEventListener('click', changeClick);
// let checkButton = document.getElementById('checkButton');
// checkButton.addEventListener('click', checkClick);
// let downloadButton = document.getElementById('downloadButton');
// downloadButton.addEventListener('click', downloadClick)