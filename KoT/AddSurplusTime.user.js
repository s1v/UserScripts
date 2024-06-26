// ==UserScript==
// @name         KoT-AddSurplusTime
// @namespace    https://github.com/s1v/UserScripts/raw/main/KoT/AddSurplusTime.user.js
// @version      2024-06-19
// @description  KoTのタイムカードに現在の余剰労働時間を追加表示します（1日の標準労働時間を8時間とする）
// @author       s1v
// @match        https://s2.ta.kingoftime.jp/admin/*/working/*
// @match        https://s2.ta.kingoftime.jp/admin/*
// @icon         https://s2.ta.kingoftime.jp/images/iPhone_home_icon_kot.png
// ==/UserScript==

(function() {
    'use strict';

    const workDataTable = document.evaluate('/html/body/div/div[2]/div/div[6]/div[1]/table/tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    const workTimes = Array.from(workDataTable.querySelectorAll('.custom1'));

    const workDays = workTimes.filter(child => Number(child.textContent)).length; //労働日数
    const kotWorkedTime = document.getElementsByClassName('specific-table_800').item('table').children[1].children[0].children[1].innerText; //労働時間(KoT形式)

    /*労働時間(KoT形式)を労働時間(min)に変換*/
    const part = kotWorkedTime.toString().split('.');
    const workedTime = (Number(part[0]) * 60) + (Number(part[1])); //労働時間(min)

    const standardWorkTime = workDays * 8 * 60; //労働日数*時間*分 = 標準労働時間(min)

    const bonusTime = workedTime - standardWorkTime; //貯金時間(min)

    /*要素の追加先となるHTMLElementを取得*/
    const tableHeadRow = document.evaluate('/html/body/div/div[2]/div/div[4]/table/thead/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    const tableBodyRow = document.evaluate('/html/body/div/div[2]/div/div[4]/table/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    /*theadの子要素を生成・theadに追加*/
    const additionalHeadColumn = document.createElement('th');
    const additionalHeadItem = document.createElement('p');
    const headTextNode = document.createTextNode('余剰労働時間');
    additionalHeadItem.appendChild(headTextNode);
    additionalHeadColumn.appendChild(additionalHeadItem);
    tableHeadRow.appendChild(additionalHeadColumn);

    /*tbodyの子要素を生成・tbodyに追加*/
    const additionalBodyColumn = document.createElement('td');
    const bodyTextNode = document.createTextNode(`${bonusTime}分`);
    additionalBodyColumn.appendChild(bodyTextNode);
    tableBodyRow.appendChild(additionalBodyColumn);
})();
