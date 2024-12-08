let timerInterval = null;
let timeRemaining = 0;

function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    document.getElementById('timer-display').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

function parseTimeInput() {
    const timeInput = document.getElementById('timer-display').textContent.trim();
    const parts = timeInput.split(':').map(part => parseInt(part) || 0);
    if (parts.length === 3) {
        return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    }
    return 0;
}

function startTimer() {

    if (!timerInterval && timeRemaining > 0) {
        document.getElementById('timer-display').contentEditable = "false"; // 禁止编辑
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    timeRemaining--;
    displayTime(timeRemaining);
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timer-display').contentEditable = "true"; // 允许重新编辑
    }
}

function pauseOrResumeTimer() {
    timeRemaining = parseTimeInput();
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timer-display').contentEditable = "true"; // 恢复编辑
    } else if (timeRemaining > 0) {
        document.getElementById('timer-display').contentEditable = "false"; // 禁止编辑
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeRemaining = 20*60;
    displayTime(timeRemaining);
    document.getElementById('timer-display').contentEditable = "true"; // 允许编辑
}

displayTime(20*60);