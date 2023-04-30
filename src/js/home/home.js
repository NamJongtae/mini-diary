'use strict';

import { getCreatedAt } from "../commons/libray.js";
import { userData } from "../commons/commons.js";
import { FetchDiarys, FetchUserData} from "../commons/firebase.js";

const $sectionContents = document.querySelector(".section-contents")
const $recentDiaryLists = $sectionContents.querySelector(".recent-diaryLists");
const $fortuneContents = $sectionContents.querySelector(".fortune-cotents");
const data = await FetchDiarys(userData.nickname) || [];
const fortune = (await FetchUserData(userData.nickname)).fortune; 
rederRecentDiary();
renderFortune();
  function rederRecentDiary() {
    $recentDiaryLists.innerHTML = '';
    if(data.length===0){
      $recentDiaryLists.innerHTML+=`
      <li class="none-diary">현재 다이어리가 없어요~</li>
      `
      return;
    }
 
    const frag = document.createDocumentFragment();
    for(const item of data){
      const $diaryItem = document.createElement('li');
      const $recentLink = document.createElement('a');
      const $createdAt = document.createElement('time');

      $diaryItem.setAttribute('class', 'recent-item');

      $recentLink.textContent = item.title;
      $recentLink.setAttribute('href', `src/template/diary.html?id=${item.id}`);

      $createdAt.setAttribute("class", "createdAt");
      $createdAt.setAttribute("datetime", new Date(item.createdAt).toISOString());
      $createdAt.textContent = getCreatedAt(item.createdAt);

      frag.appendChild($diaryItem);
      $diaryItem.appendChild($recentLink);
      $diaryItem.appendChild($createdAt);
    }
    $recentDiaryLists.appendChild(frag)
  }

  function renderFortune(){
    if(fortune){
      $fortuneContents.textContent = fortune.result
    }
    else{
      $fortuneContents.textContent = '아직 운세를 보지 않았네요.'
    }
  }