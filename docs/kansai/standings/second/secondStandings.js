const league = "関西キャップリーグA2部"
const season = "2025年春季";
// const teams = [["大阪大学", "近畿大学", "大阪公立大B", "奈良大学"],["賀茂別雷", "京都大学C", "龍谷大学B", "同志社大学B"]];
// const teamNum = [teams[0].length, teams[1].length];
const teams = ["同志社大学", "近畿大学", "大和大学洛中洛蓋連合","United Nagoya"]
const teamLogoPath = ["../../teamLogo/doshisha.jpg", "../../teamLogo/CITRUS.jpg", "../../teamLogo/logomark.jpg", "../../teamLogo/unitedNagoya.jpg"]
const teamNum = [teams.length]

const width = 1920;
const height = 1080;

const winPoint = 3;
const drawPoint = 1;
const losePoint = 0;

// async 関数を呼び出す
loadAndAddFont();
// document.write("Aブロック<br>");
create();
// document.write("Bブロック<br>");
// createBlock(1);
document.write(`<Button onClick="changeClick()">更新(入力後に押す)</Button>`);
document.write('<Button onClick="downloadClick()">ダウンロード(最後に押す)</Button>');
document.write('<Button onclick=openTwitterApp()>Xに投稿(スマホアプリを開く)</button><br>');
document.write('<canvas class="canvas" width="1920" height="1080"></canvas>');
const canvas = document.querySelector('.canvas'); // canvasの取得
let imagePath = "secondStandingsBackground2025spring.jpg"; // 背景画像の取得
const ctx = canvas.getContext("2d"); // ctxの取得
let today = new Date(); // 現在の日付を取得
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let now = year + "年" + month + "月" + day + "日時点"; // 日付フォーマット
let title = league + " " + season + "順位表";
const background = new Image();
let count = 0;
var logoObj = [];
loadLogo();
changeClick();
appendOption();
// appendOptionBlock(0);
// appendOptionBlock(1);
button();

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

function create() {
    for (var i = 0; i < teamNum; i++) {
        document.write('<label>' + Number(i + 1) +'位チーム：<select id="team' + i +'"></select></label>');
        document.write('<label>勝:<input type="number" id="teamWin' + i + '" step="1" value="0"></label>');
        document.write('<label>負:<input type="number" id="teamLose' + i + '" step="1" value="0"></label>');
        document.write('<label>分:<input type="number" id="teamDraw' + i + '" step="1" value="0"></label>');
        if (i != teamNum -1) {
            document.write('<input type="button" value="入替" id="replacement' + i + '"></input><br>');
        } else {
            document.write('<br>');
        }
    }
}

function createBlock(block) {
    for (var i = 0; i < teamNum[block]; i++) {
        document.write('<label>' + Number(i + 1) +'位チーム：<select id="team' + block + i +'"></select></label>');
        document.write('<label>勝:<input type="number" id="teamWin' + block + i + '" step="1" value="0"></label>');
        document.write('<label>負:<input type="number" id="teamLose' + block + i + '" step="1" value="0"></label>');
        document.write('<label>分:<input type="number" id="teamDraw' + block + i + '" step="1" value="0"></label>');
        if (i != teamNum[block] -1) {
            document.write('<input type="button" value="入替" id="replacement' + block + i + '"></input><br>');
        } else {
            document.write('<br>');
        }
    }
}

function changeClick() {
    background.addEventListener("load",function (){
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(background, 0, 0, width, height); // 背景画像の描画
        ctx.globalCompositeOperation = "source-over"; // デフォルト
        ctx.shadowColor = "#555"; // 影設定
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "65px Zen Kaku Gothic New";
        ctx.textAlign = "center"
        ctx.fillText(title, width / 2 + 70, 150); // タイトルの描画
        // ctx.fillText("Aブロック", width / 4, 325);
        // ctx.fillText("Bブロック", width * 3 / 4, 325);
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(380, 155, 1300, 3); // タイトル下線部の描画
        // ctx.fillRect(325, 330, 300, 3);
        // ctx.fillRect(1285, 330, 300, 3);
        ctx.shadowColor = "#000"; // 影設定リセット
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.font = "50px Zen Kaku Gothic New";
        ctx.textAlign = "right"
        ctx.fillText(now, width - 20, 1070); // 現在の日付の描画

        let teamName = [];
        let teamLogo = [];
        let teamWin = [];
        let teamLose = [];
        let teamDraw = [];
        let teamGame = [];
        let teamPoint = [];
        let teamRate = [];

        for (var i = 0; i < teamNum; i++) {
            if (document.getElementById('team' + i).value != null && document.getElementById('teamWin' + i).value != null && document.getElementById('teamLose' + i).value != null && document.getElementById('teamDraw' + i).value != null) {
                teamName.push(document.getElementById('team' + i).value);
                teamWin.push(Number(document.getElementById('teamWin' + i).value));
                teamLose.push(Number(document.getElementById('teamLose' + i).value));
                teamDraw.push(Number(document.getElementById('teamDraw' + i).value));
                if (teamWin[i] + teamLose[i] > 0) {
                    teamRate.push(teamWin[i]/(teamWin[i] + teamLose[i]));
                } else {
                    teamRate.push(0);
                }
            } else {
                alert('値を入力してください。');
                return false;
            }
        }

        for (var i = 0; i < teamNum; i++) {
            for (var j = 0; j < teamNum; j++) {
                if (teamName[i] == teams[j]) {
                    teamLogo.push(logoObj[j]);
                }
            }
        }

        for (var i = 0; i < teamNum; i++) {
            teamGame.push(teamWin[i] + teamLose[i] + teamDraw[i]);
            teamPoint.push(teamWin[i] * winPoint + teamLose[i] * losePoint + teamDraw[i] * drawPoint);
        }

        check(teamPoint, teamRate, teamWin);

        for (var i = 0; i < teamNum; i++) {
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            if (teamName[i] === "United Nagoya") {
                ctx.font = "96px Zen Kaku Gothic New";
                ctx.fillText(teamName[i], 260, 363 + (212 * i));
            } else if (teamName[i].length > 8) {
                ctx.font = "67px Zen Kaku Gothic New";
                ctx.fillText(teamName[i], 260, 360 + (212 * i));
            } else if (teamName[i].length > 7) {
                ctx.font = "82px Zen Kaku Gothic New";
                ctx.fillText(teamName[i], 260, 363 + (212 * i));
            } else {
                ctx.font = "96px Zen Kaku Gothic New";
                ctx.fillText(teamName[i], 260, 368 + (212 * i));
            }
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "100px Zen Kaku Gothic New";
            ctx.textAlign = "center";
            ctx.fillText(teamGame[i], 1137, 370 + (212 * i));
            ctx.fillText(teamWin[i], 1302, 370 + (212 * i));
            ctx.fillText(teamLose[i], 1470, 370 + (212 * i));
            ctx.fillText(teamDraw[i], 1638, 370 + (212 * i));
            ctx.fillText(teamPoint[i], 1806, 370 + (212 * i));
        }
        display(teamLogo);

        // for (var block = 0; block <= 0; block++) {
        //     let teamName = [];
        //     let teamWin = [];
        //     let teamLose = [];
        //     let teamDraw = [];
        //     let teamGame = [];
        //     let teamPoint = [];
        //     let teamRate = [];

        //     for (var i = 0; i < teamNum[block]; i++) {
        //         if (document.getElementById('team' + block + i).value != null && document.getElementById('teamWin' + block + i).value != null && document.getElementById('teamLose' + block + i).value != null && document.getElementById('teamDraw' + block + i).value != null) {
        //             teamName.push(document.getElementById('team' + block + i).value);
        //             teamWin.push(Number(document.getElementById('teamWin' + block + i).value));
        //             teamLose.push(Number(document.getElementById('teamLose' + block + i).value));
        //             teamDraw.push(Number(document.getElementById('teamDraw' + block + i).value));
        //             if (teamWin[i] + teamLose[i] > 0) {
        //                 teamRate.push(teamWin[i]/(teamWin[i] + teamLose[i]));
        //             } else {
        //                 teamRate.push(0);
        //             }
        //         } else {
        //             alert('値を入力してください。');
        //             return false;
        //         }
        //     }

        //     for (var i = 0; i < teamNum[block]; i++) {
        //         teamGame.push(teamWin[i] + teamLose[i] + teamDraw[i]);
        //         teamPoint.push(teamWin[i] * winPoint + teamLose[i] * losePoint + teamDraw[i] * drawPoint);
        //     }

        //     check(teamPoint, teamRate, teamWin, block);

        //     for (var i = 0; i < teamNum[block]; i++) {
        //         ctx.fillStyle = "#000000";
        //         ctx.font = "96px Zen Kaku Gothic New";
        //         ctx.textAlign = "left";
        //         ctx.font = "72px Zen Kaku Gothic New";
        //         ctx.fillText(teamName[i], 125 + (935 * block), 500 + (165 * i));
        //         ctx.fillStyle = "#FFFFFF";
        //         ctx.font = "96px Zen Kaku Gothic New";
        //         ctx.textAlign = "center";
        //         //ctx.fillText(teamGame[i], 500 + (935 * block), 510 + (165 * i));
        //         ctx.fillText(teamWin[i], 590 + (935 * block), 510 + (165 * i));
        //         ctx.fillText(teamLose[i], 682.5 + (935 * block), 510 + (165 * i));
        //         ctx.fillText(teamDraw[i], 775 + (935 * block), 510 + (165 * i));
        //         ctx.fillText(teamPoint[i], 892 + (935 * block), 510 + (165 * i));
        //     }
        // }
        
    });
    background.crossOrigin = "anonymous";
    background.src = imagePath;
}

function appendOption() {
    for (var i = 0; i < teamNum; i++) {
        for (var j = 0; j < teamNum; j++) {
            let newOption = new Option(teams[j], teams[j]);
            document.getElementById('team' + i).append(newOption);
        }
    }
}

function appendOptionBlock(block) {
    for (var i = 0; i < teamNum[block]; i++) {
        for (var j = 0; j < teamNum[block]; j++) {
            let newOption = new Option(teams[block][j], teams[block][j]);
            document.getElementById('team' + block + i).append(newOption);
        }
    }
}

function check(teamPoint, teamRate, teamWin) {
    for (let i = 0; i < teamNum - 1; i++) {
        if (teamPoint[i] < teamPoint[i + 1]) {
            alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝ち点順位が違います。');
            return false;
        } else if (teamPoint[i] == teamPoint[i + 1]) {
            if (teamRate[i] < teamRate[i + 1]) {
                alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝率順位が違います。');
                return false;
            } else if (teamRate[i] == teamRate[i + 1]) {
                if (teamWin[i] < teamWin[i + 1]) {
                    alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝利数順位が違います。');
                    return false;
                }
            }
        }
    }
    return true;
}

function checkBlock(teamPoint, teamRate, teamWin, block) {
    for (let i = 0; i < teamNum[block] - 1; i++) {
        if (teamPoint[i] < teamPoint[i + 1]) {
            alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝ち点順位が違います。');
            return false;
        } else if (teamPoint[i] == teamPoint[i + 1]) {
            if (teamRate[i] < teamRate[i + 1]) {
                alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝率順位が違います。');
                return false;
            } else if (teamRate[i] == teamRate[i + 1]) {
                if (teamWin[i] < teamWin[i + 1]) {
                    alert(Number(i + 1) + '位と' + Number(i + 2) +'位の勝利数順位が違います。');
                    return false;
                }
            }
        }
    }
    return true;
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
    for (var i = 0; i < teamNum; i++) {
        ctx.drawImage(teamLogo[i], 930, 282 + (212.5 * i), 100, 100)
    }
}

function downloadClick(){
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'kansaiSecondStandings_' + year + month + day +'.jpeg'; // ファイル名を指定
    link.click();
}

function button() {
    let replacementButton = []
    for (let block = 0; block <= 1; block++) {
        for (let i = 0; i < teamNum[block] - 1; i++) {
            replacementButton[i] = document.getElementById('replacement' + block + i);
            replacementButton[i].addEventListener("click", function() {
            replacement(block, i, i+1);
        });
        }
    }
}

function replacement(block, high, low) {
    var fields = ['team', 'teamWin', 'teamLose', 'teamDraw'];
    
    fields.forEach(function(field) {
        var temp = document.getElementById(field + block + high).value;
        document.getElementById(field + block + high).value = document.getElementById(field + block + low).value;
        document.getElementById(field + block + low).value = temp;
    });
}

function openTwitterApp() {
    var appUrl = "twitter://post?message=";
    let messageUrl = encodeURIComponent("【" + league + season +"順位表】\nAブロック：\nBブロック：\n#キャップ野球\n#関西キャップリーグ\n#関西キャップリーグ2024秋\n#capbaseball");
    
    //アプリのURLスキームで開く
    window.location.href = appUrl + messageUrl;
}