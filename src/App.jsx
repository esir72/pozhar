import React, { useEffect, useState } from 'react';

const slides = [
  ['КРАТКИЙ ОБЗОР · 2026', <>Пожарная<br />безопасность</>, 'в организации', '0% 0%'],
  ['НОРМАТИВНАЯ ОСНОВА', <>Три уровня<br />правил</>, null, '100% 0%'],
  ['КТО ЗА ЧТО ОТВЕЧАЕТ', <>Ответственность<br />распределена</>, null, '0% 100%'],
  ['СИСТЕМА В ДЕЙСТВИИ', <>Порядок<br />каждый день</>, null, '100% 100%'],
  ['ГЛАВНЫЙ ВЫВОД', <>Безопасность —<br />общая работа</>, null, '0% 0%'],
  ['РАСПРЕДЕЛЕНИЕ ОТВЕТСТВЕННОСТИ', <>Обязанность<br />и должность</>, null, '0% 100%'],
];

const laws = [
  ['69-ФЗ', 'О пожарной безопасности', 'Обязанности и ответственность'],
  ['123-ФЗ', 'Технический регламент', 'Требования к зданиям и защите'],
  ['№ 1479', 'Правила противопожарного режима', 'Требования для объектов'],
  ['№ 1120', 'Порядок обучения МЧС', 'Инструктажи и обучение'],
];

const dutyTables = [
  {
    title: 'Организация и обучение',
    rows: [
      ['Подписать приказ о назначении ответственного', 'Руководитель'],
      ['Организовать обучение и инструктажи', 'Руководитель'],
      ['Провести вводный инструктаж по утверждённой программе', 'Ответственный за ПБ'],
      ['Контролировать комплектность и сроки обслуживания огнетушителей', 'Ответственный за ПБ'],
    ],
  },
  {
    title: 'Работа на месте',
    rows: [
      ['Проверить эвакуационные проходы в своём подразделении', 'Начальник отдела'],
      ['Закрыть электрощитовую по локальному порядку', 'Назначенный работник'],
      ['Пройти инструктаж и соблюдать противопожарные требования', 'Работник'],
      ['Сообщить о неисправности или признаках пожара', 'Работник'],
    ],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const go = (n) => setIndex(Math.max(0, Math.min(slides.length - 1, n)));

  useEffect(() => {
    const onKey = (event) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(event.key)) go(index + 1);
      if (['ArrowUp', 'ArrowLeft'].includes(event.key)) go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const [tag, title, subtitle, photoPosition] = slides[index];

  return <main className="app" style={{ '--photo': `url(${import.meta.env.BASE_URL}fire-safety.svg)`, '--photo-pos': photoPosition }}>
    <header><b>◉ ПБ　 ПАМЯТКА ОРГАНИЗАЦИИ</b><span>ПОЖАРНАЯ БЕЗОПАСНОСТЬ · 2026</span></header>
    <nav aria-label="Навигация по слайдам">{slides.map((_, number) => <button className={index === number ? 'on' : ''} onClick={() => go(number)} key={number}>0{number + 1}<i /></button>)}</nav>
    <section className={`scene ${index === 5 ? 'matrix-scene' : ''}`} key={index}>
      <div className="photo" /><div className="shade" />
      <div className="content">
        <label><i />{tag}</label>
        <h1>{title}{subtitle && <><br /><em>{subtitle}</em></>}</h1>
        {index === 0 && <>
          <p>Кто отвечает, какие правила соблюдать<br />и как выстроить систему защиты.</p>
          <button className="start" onClick={() => go(1)}>Смотреть презентацию　↗</button>
          <small className="duration">6 СЛАЙДОВ · 3 МИНУТЫ</small>
        </>}
        {index === 1 && <div className="cards">{laws.map((item) => <article key={item[0]}><small>{item[0]}</small><b>{item[1]}</b><p>{item[2]}</p></article>)}</div>}
        {(index === 2 || index === 3) && <div className="list">{(index === 2
          ? [['01', 'Руководитель', 'Организует систему и отвечает за её работу.'], ['02', 'Ответственный за ПБ', 'Документы, обучение и контроль требований.'], ['03', 'Работники', 'Соблюдают режим и сообщают об опасности.']]
          : [['01', 'Приказы и инструкция', 'Назначить ответственных, закрепить правила.'], ['02', 'Инструктажи', 'Объяснить порядок действий работникам.'], ['03', 'Проверки', 'Следить за оборудованием и свободой выходов.']]
        ).map((item) => <article key={item[0]}><small>{item[0]}</small><div><b>{item[1]}</b><p>{item[2]}</p></div></article>)}{index === 2 && <p className="note">Назначение ответственного не отменяет обязанностей руководителя.</p>}</div>}
        {index === 4 && <>
          <p>Правила работают, когда роли понятны,<br />инструктажи регулярны, а выходы свободны.</p>
          <div className="flow">РУКОВОДИТЕЛЬ　<b>→</b>　ОТВЕТСТВЕННЫЙ　<b>→</b>　КАЖДЫЙ СОТРУДНИК</div>
          <a href="https://www.consultant.ru/document/cons_doc_LAW_5438/" target="_blank" rel="noreferrer">Нормативная база: 69-ФЗ, 123-ФЗ, ПП № 1479, приказ МЧС № 1120 ↗</a>
        </>}
        {index === 5 && <div className="duty-tables">
          {dutyTables.map((table) => <section className="duty-table-panel" key={table.title}>
            <h2>{table.title}</h2>
            <table><thead><tr><th>Название обязанности</th><th>Должность</th></tr></thead>
              <tbody>{table.rows.map(([duty, role]) => <tr key={duty}><td>{duty}</td><td>{role}</td></tr>)}</tbody>
            </table>
          </section>)}
          <p className="duty-note">Точные обязанности закрепляют приказами и инструкциями организации. Электрощитовую закрывает только уполномоченный работник.</p>
        </div>}
      </div>
    </section>
    <footer><span>ПОЖАРНАЯ БЕЗОПАСНОСТЬ</span><span>0{index + 1} / 0{slides.length}</span></footer>
    {index < slides.length - 1 && <button className="next" aria-label="Следующий слайд" onClick={() => go(index + 1)}>↓</button>}
    {index > 0 && <button className="prev" aria-label="Предыдущий слайд" onClick={() => go(index - 1)}>↑</button>}
    <aside><i style={{ height: `${((index + 1) / slides.length) * 100}%` }} /></aside>
  </main>;
}
