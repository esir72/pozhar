import React, { useEffect, useState } from 'react';

const slides = [
  ['КРАТКИЙ ОБЗОР · 2026', <>Пожарная<br />безопасность</>, 'в организации', '0% 0%'],
  ['НОРМАТИВНАЯ ОСНОВА', <>Три уровня<br />правил</>, null, '100% 0%'],
  ['КТО ЗА ЧТО ОТВЕЧАЕТ', <>Ответственность<br />распределена</>, null, '0% 100%'],
  ['СИСТЕМА В ДЕЙСТВИИ', <>Порядок<br />каждый день</>, null, '100% 100%'],
  ['ГЛАВНЫЙ ВЫВОД', <>Безопасность —<br />общая работа</>, null, '0% 0%'],
  ['ИНТЕРАКТИВ · 3–5 МИНУТ', <>Распредели<br />обязанности</>, null, '0% 100%'],
];

const laws = [
  ['69-ФЗ', 'О пожарной безопасности', 'Обязанности и ответственность'],
  ['123-ФЗ', 'Технический регламент', 'Требования к зданиям и защите'],
  ['№ 1479', 'Правила противопожарного режима', 'Требования для объектов'],
  ['№ 1120', 'Порядок обучения МЧС', 'Инструктажи и обучение'],
];

const roles = [
  { id: 'leader', name: 'Руководитель организации' },
  { id: 'responsible', name: 'Ответственный за ПБ' },
  { id: 'manager', name: 'Начальник отдела' },
  { id: 'worker', name: 'Работник' },
];

const roleTasks = [
  { id: 'order', text: 'Подписать приказ о назначении ответственного', answer: 'leader' },
  { id: 'organize', text: 'Организовать обучение и инструктажи в организации', answer: 'leader' },
  { id: 'brief', text: 'Провести вводный инструктаж по назначенной программе', answer: 'responsible' },
  { id: 'extinguisher', text: 'Проверить огнетушители на закреплённом участке', answer: 'responsible' },
  { id: 'exit', text: 'Проверить свободный эвакуационный проход в своём отделе', answer: 'manager' },
  { id: 'switchroom', text: 'Закрыть электрощитовую по локальному порядку после смены', answer: 'worker' },
  { id: 'follow', text: 'Соблюдать инструкцию, пройти инструктаж, сообщить об опасности', answer: 'worker' },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [checked, setChecked] = useState(false);
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
  const roleName = (id) => roles.find((role) => role.id === id)?.name;
  const complete = Object.keys(assignments).length === roleTasks.length;
  const score = roleTasks.filter((task) => assignments[task.id] === task.answer).length;

  const assignRole = (roleId) => {
    if (!selectedTask) return;
    setAssignments((current) => ({ ...current, [selectedTask]: roleId }));
    setSelectedTask(null);
    setChecked(false);
  };

  const resetGame = () => {
    setSelectedTask(null);
    setAssignments({});
    setChecked(false);
  };

  return <main className="app" style={{ '--photo': `url(${import.meta.env.BASE_URL}fire-safety.svg)`, '--photo-pos': photoPosition }}>
    <header><b>◉ ПБ　 ПАМЯТКА ОРГАНИЗАЦИИ</b><span>ПОЖАРНАЯ БЕЗОПАСНОСТЬ · 2026</span></header>
    <nav aria-label="Навигация по слайдам">{slides.map((_, number) => <button className={index === number ? 'on' : ''} onClick={() => go(number)} key={number}>0{number + 1}<i /></button>)}</nav>
    <section className={`scene ${index === 5 ? 'game-scene' : ''}`} key={index}>
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
        {index === 5 && <div className="role-game">
          <p className="game-instruction">Нажми на обязанность, затем выбери роль. Распредели все карточки и проверь себя.</p>
          <div className="game-layout">
            <div className="task-grid" aria-label="Обязанности">
              {roleTasks.map((task, number) => {
                const assigned = assignments[task.id];
                const isCorrect = assigned === task.answer;
                return <button key={task.id} className={`task-card ${selectedTask === task.id ? 'chosen' : ''} ${checked && assigned ? (isCorrect ? 'correct' : 'incorrect') : ''}`} onClick={() => { setSelectedTask(task.id); setChecked(false); }}>
                  <span className="task-number">0{number + 1}</span><b>{task.text}</b>
                  <small>{assigned ? roleName(assigned) : 'Нажми, чтобы выбрать'}</small>
                  {checked && assigned && !isCorrect && <em>Правильно: {roleName(task.answer)}</em>}
                </button>;
              })}
            </div>
            <div className="role-grid" aria-label="Роли">
              {roles.map((role) => <button key={role.id} className="role-card" disabled={!selectedTask} onClick={() => assignRole(role.id)}>
                <small>РОЛЬ</small><b>{role.name}</b><span>{Object.values(assignments).filter((value) => value === role.id).length} обязанностей назначено</span>
              </button>)}
            </div>
          </div>
          <div className="game-actions">
            <span>{checked ? (score === roleTasks.length ? 'Отлично! Все роли распределены верно.' : `Верно ${score} из ${roleTasks.length}. Подсвеченные карточки можно переназначить.`) : `${Object.keys(assignments).length} из ${roleTasks.length} распределено`}</span>
            <button disabled={!complete} onClick={() => setChecked(true)}>Проверить</button>
            <button className="reset-game" onClick={resetGame}>Начать заново</button>
          </div>
          <p className="game-note">Точные обязанности закрепляют приказом и инструкцией организации. Электрощитовую закрывает только уполномоченный работник по установленному порядку.</p>
        </div>}
      </div>
    </section>
    <footer><span>ПОЖАРНАЯ БЕЗОПАСНОСТЬ</span><span>0{index + 1} / 0{slides.length}</span></footer>
    {index < slides.length - 1 && <button className="next" aria-label="Следующий слайд" onClick={() => go(index + 1)}>↓</button>}
    {index > 0 && <button className="prev" aria-label="Предыдущий слайд" onClick={() => go(index - 1)}>↑</button>}
    <aside><i style={{ height: `${((index + 1) / slides.length) * 100}%` }} /></aside>
  </main>;
}
