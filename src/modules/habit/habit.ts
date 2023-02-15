import { clickBtn } from './modalHabit';
import { allHabits } from './modalHabit';

const newHabitBtn = document.createElement('button');
newHabitBtn.className = 'btn-new-habit';
newHabitBtn.innerHTML = '+ New Habit';
export const calendarDiv = document.querySelector('.calendar');
newHabitBtn.addEventListener('click', clickBtn);

export function insertAddBtn() {
    return newHabitBtn;
}

export function createRow() {
    const tableBody = document.querySelector('.table-body');
    const newRow = document.createElement('tr');

    if (Array.from((tableBody as HTMLElement).childNodes).length === 1) {
        newRow.className = 'row-1';
        tableBody?.append(newRow);
    } else {
        const arrRows = (tableBody as HTMLElement).children;
        const rowName = arrRows[arrRows.length - 1].className;
        const rowNumber = Number(rowName.slice(4));

        newRow.className = `row-${rowNumber + 1}`;
        tableBody?.append(newRow);
    }

    // get qty day of month **********
    const allDayOfMonth = document.querySelectorAll('.body-cell');
    const arrayAllDayOfMonth = Array.from(allDayOfMonth);
    const daysOfMonth = arrayAllDayOfMonth.filter((e) => e.id !== '').length;
    // *************

    const cellTableHabit = document.createElement('td');
    cellTableHabit.className = `td-habit`;
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableHabit);

    for (let i = 1; i < daysOfMonth + 1; i++) {
        const cellTable = document.createElement('td');
        cellTable.className = `td-${i}`;
        cellTable.addEventListener('click', coloredTd);
        (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTable);
    }

    const cellTableGoal = document.createElement('td');
    cellTableGoal.className = `td-goal`;
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableGoal);

    const cellTableAchieved = document.createElement('td');
    cellTableAchieved.className = `td-achieved`;
    cellTableAchieved.innerHTML = '0';
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableAchieved);
}

export function fillRow(i: number) {
    const tdHabit = document.querySelector('.table-body')?.lastElementChild?.firstElementChild;
    const tdRow = document.querySelector('.table-body')?.lastElementChild?.childNodes;
    const tdGoal = (tdRow as NodeList)[(tdRow as NodeList).length - 2];

    (tdHabit as HTMLElement).innerHTML = `${allHabits[i].name}`;
    (tdGoal as HTMLElement).innerHTML = `${allHabits[i].goal}`;
}

export function coloredTd(e: Event) {
    const currTdNumber = Number((e.target as Element).classList[0].slice(3));
    const currDate = document.querySelectorAll('.body-cell')[currTdNumber - 1];
    const currParentNumber = Number((e.target as Element).parentElement?.className.slice(4));
    const listAllDates = allHabits[currParentNumber - 1].date;

    (e.target as HTMLElement).classList.toggle('td-colored');

    if ((e.target as HTMLElement).innerHTML === '') {
        (e.target as HTMLElement).innerHTML = '&#10004;';

        allHabits[currParentNumber - 1].date.push(currDate.id);
        localStorage.setItem('RS-habit', JSON.stringify(allHabits));
    } else {
        (e.target as HTMLElement).innerHTML = '';

        if (listAllDates.includes(currDate.id)) {
            const newListAllDates = listAllDates.filter(function (f: string) {
                return f !== currDate.id;
            });
            allHabits[currParentNumber - 1].date = newListAllDates;
        }

        localStorage.setItem('RS-habit', JSON.stringify(allHabits));
    }

    countAchieved(e);
}

export function countAchieved(e: Event) {
    const parentEl = (e.target as HTMLElement).parentElement;
    const tdAchieved = parentEl?.lastElementChild;
    const allColoredTd = document.querySelectorAll('.td-colored');
    const allColoredTdArray = Array.prototype.slice.call(allColoredTd);
    const countElements = allColoredTdArray.filter((el) => el.parentElement === parentEl);

    const allTdGoal = parentEl?.childNodes;
    const tdGoal = (allTdGoal as NodeList)[(allTdGoal as NodeList).length - 2];

    (tdAchieved as HTMLElement).innerHTML = `${countElements.length}`;

    if (Number(tdAchieved?.textContent) >= Number(tdGoal.textContent)) {
        tdAchieved?.classList.add('td-complete');
    } else {
        tdAchieved?.classList.remove('td-complete');
    }
}

export function renderHabits() {
    for (let i = 0; i < allHabits.length; i++) {
        createRow();
        fillRow(i);
    }
}
