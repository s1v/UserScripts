// ==UserScript==
// @name         KoT-AddSurplusTime
// @namespace    https://github.com/s1v/UserScripts
// @version      2024-06-13
// @description  KoTのタイムカードに現在の余剰労働時間を追加表示します（1日の標準労働時間を8時間とする）
// @author       s1v
// @match        https://s2.ta.kingoftime.jp/admin/*/working/*
// @match        https://s2.ta.kingoftime.jp/admin/*
// @icon         https://s2.ta.kingoftime.jp/images/iPhone_home_icon_kot.png
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const workCount = Number(document.getElementsByClassName('work_count').item(1).innerText); //労働日数
    const kotWorkedTime = document.getElementsByClassName('specific-table_800').item('table').children[1].children[0].children[1].innerText; //労働時間(KoT形式)

    const part = kotWorkedTime.toString().split('.');
    const workedTime = (Number(part[0]) * 60) + (Number(part[1])); //労働時間(min)

    const standardWorkTime = workCount * 8 * 60; //労働日数*時間*分 = 標準労働時間(min)

    const bonusTime = workedTime - standardWorkTime; //貯金時間(min)

    const tableHeadRow = document.evaluate('/html/body/div/div[2]/div/div[4]/table/thead/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    const tableBodyRow = document.evaluate('/html/body/div/div[2]/div/div[4]/table/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    const additionalHeadColumn = document.createElement('th');
    const additionalHeadItem = document.createElement('p');
    const headTextNode = document.createTextNode('ボーナスタイム');
    additionalHeadItem.appendChild(headTextNode);
    additionalHeadColumn.appendChild(additionalHeadItem);
    tableHeadRow.appendChild(additionalHeadColumn);

    const additionalBodyColumn = document.createElement('td');
    const bodyTextNode = document.createTextNode(`${bonusTime}分`);
    additionalBodyColumn.appendChild(bodyTextNode);
    tableBodyRow.appendChild(additionalBodyColumn);
})();
