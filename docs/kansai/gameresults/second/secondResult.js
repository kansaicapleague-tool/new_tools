const league = "関西キャップリーグA２部"
const season = "2025年春季";
const teams = ["同志社大学", "近畿大学", "大和大学洛中洛蓋連合","United Nagoya"]
const teamLogoPath = ["../../teamLogo/doshisha.jpg", "../../teamLogo/CITRUS.jpg", "../../teamLogo/logomark.jpg", "../../teamLogo/unitedNagoya.jpg"]
const teamNum = teams.length;

const width = 1920;
const height = 1080;

// async 関数を呼び出す
loadAndAddFont();
loadAndAddFont2();
create();
const canvas = document.querySelector('.canvas'); // canvasの取得
let imagePath = "secondResultBackground.jpg"; // 背景画像の取得
const ctx = canvas.getContext("2d"); // ctxの取得
const background = new Image();
let today = new Date(); // 現在の日付を取得
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let count = 0;
var logoObj = [];
loadLogo();
changeClick();
appendOption();

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

async function loadAndAddFont2() {
    const exampleFontFamilyName = "Jaro"; // 取得したいGoogleフォント名
    const googleApiUrl = "https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap";
  
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

function create() {
    let today = new Date(); // 現在の日付を取得
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let now = year + "-" + month + "-" + day;
    document.getElementById("date").value = now;
}

function changeClick() {
    background.addEventListener("load",function (){
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(background, 0, 0, width, height); // 背景画像の描画
        ctx.globalCompositeOperation = "source-over"; // デフォルト
        ctx.shadowColor = "#555"; // 影設定
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "65px Zen Kaku Gothic New";

        let teamLogo = [];

        for (var i = 1; i <= 2; i++) {
            for (var j = 0; j < teamNum; j++) {
                if (document.getElementById('team' + i).value == teams[j]) {
                    teamLogo.push(logoObj[j]);
                }
            }
        }

        ctx.font = "50px Jaro";
        ctx.textAlign = "center";
        ctx.fillText(document.getElementById("date").value, width / 2, 100);
        ctx.font = "80px Zen Kaku Gothic New";
        ctx.fillText(document.getElementById("team1").value, 600, 550);
        ctx.fillText(document.getElementById("team2").value, width - 600, 550);
        ctx.font = "300px Jaro";
        ctx.fillText(document.getElementById("firstGameFirst").value, 600, 800);
        ctx.fillText(document.getElementById("firstGameSecond").value, width - 600, 800);
        ctx.fillText(document.getElementById("secondGameFirst").value, 600, 1050);
        ctx.fillText(document.getElementById("secondGameSecond").value, width - 600, 1050);
        display(teamLogo);
    });
    background.crossOrigin = "anonymous";
    background.src = imagePath;
}

function appendOption() {
    for (var i = 1; i < 3; i++) {
        for (var j = 0; j < teamNum; j++) {
            let newOption = new Option(teams[j], teams[j]);
            document.getElementById('team' + i).append(newOption);
        }
    }
}

function loadLogo() {
    var logo = new Image();

    logo.addEventListener("load",function () {
        count++;
        logoObj.push(logo);
        if (count >= teamNum) {
        } else {
            loadLogo();
        }
    });
    logo.crossOrigin = "anonymous";
    logo.src = teamLogoPath[logoObj.length];
}

function display(teamLogo) {
    ctx.drawImage(teamLogo[0], 370, 20, 450, 450);
    ctx.drawImage(teamLogo[1], 1091, 20, 450, 450);
}

function downloadClick() {
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'kansaiSecondResults_' + year + month + day +'.jpeg'; // ファイル名を指定
    link.click();
}

function openTwitterApp() {
    var appUrl = "twitter://post?message=";
    let messageUrl = encodeURIComponent("【" + league + season +"試合結果】\n\n#団体名1\n#団体名2\n#キャップ野球\n#関西キャップリーグ\n#関西キャップリーグ2024秋\n#capbaseball");
    
    //アプリのURLスキームで開く
    window.location.href = appUrl + messageUrl;
}