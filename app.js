// ========================================
// GATE CS Super App - Main Application
// ========================================

// Global State
let appState = {
    currentSection: 'dashboard',
    currentSubject: null,
    currentQuestion: null,
    practiceQuestions: [],
    mockTest: null,
    pomodoroTimer: null,
    examDate: null,
    streak: 0,
    dailyGoals: [],
    studyTasks: [],
    completedTopics: new Set(),
    questionsAttempted: 0,
    correctAnswers: 0,
    mockTestsTaken: 0,
    studyHours: 0,
    pomodoroSessions: 0
};

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeApp();
    setupNavigation();
    updateDashboard();
    renderSubjects();
    renderFormulas();
    updateExamCountdown();
    setupPomodoroTimer();
});

function initializeApp() {
    // Set default exam date if not set (GATE 2026 - February)
    if (!appState.examDate) {
        appState.examDate = new Date('2026-02-01').getTime();
        saveState();
    }

    // Initialize practice subject filters
    const pyqSubjectFilter = document.getElementById('pyqSubjectFilter');
    SUBJECTS.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        pyqSubjectFilter.appendChild(option);
    });

    // Start daily streak check
    checkDailyStreak();

    // Update countdown every minute
    setInterval(updateExamCountdown, 60000);
}

// ========================================
// Navigation
// ========================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);

            // Update nav active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = section;

        // Load section-specific content
        if (section === 'practice') {
            renderPracticeSubjects();
        } else if (section === 'mock-tests') {
            renderMockTests();
        } else if (section === 'pyqs') {
            filterPYQs();
        } else if (section === 'analytics') {
            renderAnalytics();
        }
    }
}

// ========================================
// Dashboard Functions
// ========================================
function updateDashboard() {
    // Update stats
    document.getElementById('topicsCompleted').textContent = appState.completedTopics.size;
    document.getElementById('questionsAttempted').textContent = appState.questionsAttempted;
    document.getElementById('mockTestsTaken').textContent = appState.mockTestsTaken;
    document.getElementById('studyHours').textContent = Math.floor(appState.studyHours);
    document.getElementById('streakCount').textContent = appState.streak;

    // Render daily goals
    renderDailyGoals();

    // Render recent activity
    renderRecentActivity();
}

function updateExamCountdown() {
    if (!appState.examDate) return;

    const now = new Date().getTime();
    const distance = appState.examDate - now;

    if (distance < 0) {
        document.getElementById('daysToExam').textContent = 'EXAM DAY!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('daysToExam').textContent = days;
    document.getElementById('countdownDays').textContent = days;
    document.getElementById('countdownHours').textContent = hours;
    document.getElementById('countdownMinutes').textContent = minutes;
}

function setExamDate() {
    const dateStr = prompt('Enter GATE exam date (YYYY-MM-DD):', '2026-02-01');
    if (dateStr) {
        appState.examDate = new Date(dateStr).getTime();
        saveState();
        updateExamCountdown();
    }
}

function renderDailyGoals() {
    const goalsList = document.getElementById('dailyGoalsList');

    if (appState.dailyGoals.length === 0) {
        goalsList.innerHTML = '<p class="empty-state">No goals set for today</p>';
        return;
    }

    goalsList.innerHTML = appState.dailyGoals.map((goal, index) => `
        <div class="goal-item ${goal.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${goal.completed ? 'checked' : ''} 
                   onchange="toggleGoal(${index})"
                   style="margin-right: 10px;">
            <span>${goal.text}</span>
            <button class="btn btn-secondary" 
                    onclick="deleteGoal(${index})" 
                    style="margin-left: auto; padding: 0.25rem 0.75rem;">×</button>
        </div>
    `).join('');
}

function addDailyGoal() {
    const goalText = prompt('Enter your daily goal:');
    if (goalText && goalText.trim()) {
        appState.dailyGoals.push({
            text: goalText.trim(),
            completed: false,
            date: new Date().toDateString()
        });
        saveState();
        renderDailyGoals();
        addActivity('Added new goal: ' + goalText);
    }
}

function toggleGoal(index) {
    appState.dailyGoals[index].completed = !appState.dailyGoals[index].completed;
    if (appState.dailyGoals[index].completed) {
        addActivity('Completed goal: ' + appState.dailyGoals[index].text);
    }
    saveState();
    renderDailyGoals();
}

function deleteGoal(index) {
    appState.dailyGoals.splice(index, 1);
    saveState();
    renderDailyGoals();
}

function renderRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');

    if (activities.length === 0) {
        activityList.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }

    activityList.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <span>${activity.text}</span>
            <span class="stat-text">${activity.time}</span>
        </div>
    `).join('');
}

function addActivity(text) {
    const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    activities.unshift({
        text: text,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    });

    // Keep only last 20 activities
    if (activities.length > 20) activities.pop();

    localStorage.setItem('recentActivities', JSON.stringify(activities));
    renderRecentActivity();
}

// ========================================
// Study Planner Functions
// ========================================
function addStudyTask() {
    const subject = prompt('Subject:', 'Operating Systems');
    const topic = prompt('Topic:', 'Process Scheduling');
    const date = prompt('Date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);

    if (subject && topic && date) {
        appState.studyTasks.push({
            subject,
            topic,
            date,
            completed: false
        });
        saveState();
        renderStudyTasks();
        addActivity(`Scheduled: ${topic} (${subject})`);
    }
}

function renderStudyTasks() {
    const tasksList = document.getElementById('studyTasksList');

    if (appState.studyTasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">No tasks scheduled</p>';
        return;
    }

    tasksList.innerHTML = appState.studyTasks
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((task, index) => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input type="checkbox" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(${index})"
                       style="margin-right: 10px;">
                <div style="flex: 1;">
                    <strong>${task.topic}</strong>
                    <p class="stat-text">${task.subject} • ${task.date}</p>
                </div>
                <button class="btn btn-secondary" 
                        onclick="deleteTask(${index})" 
                        style="padding: 0.25rem 0.75rem;">×</button>
            </div>
        `).join('');
}

function toggleTask(index) {
    appState.studyTasks[index].completed = !appState.studyTasks[index].completed;
    if (appState.studyTasks[index].completed) {
        appState.completedTopics.add(appState.studyTasks[index].topic);
        addActivity('Completed: ' + appState.studyTasks[index].topic);
    }
    saveState();
    renderStudyTasks();
    updateDashboard();
}

function deleteTask(index) {
    appState.studyTasks.splice(index, 1);
    saveState();
    renderStudyTasks();
}

// ========================================
// Subjects Section
// ========================================
function renderSubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');

    subjectsGrid.innerHTML = SUBJECTS.map(subject => {
        const progress = calculateSubjectProgress(subject.id);
        return `
            <div class="subject-card" onclick="viewSubjectDetails('${subject.id}')">
                <div class="subject-header">
                    <span class="subject-icon">${subject.icon}</span>
                    <div>
                        <h3 class="subject-title">${subject.name}</h3>
                        <p class="stat-text">Weightage: ${subject.weightage} marks</p>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <p class="stat-text" style="margin-top: 0.5rem;">${progress}% completed</p>
            </div>
        `;
    }).join('');
}

function calculateSubjectProgress(subjectId) {
    const subject = SUBJECTS.find(s => s.id === subjectId);
    if (!subject) return 0;

    const completedInSubject = subject.topics.filter(topic =>
        appState.completedTopics.has(topic)
    ).length;

    return Math.round((completedInSubject / subject.topics.length) * 100);
}

function viewSubjectDetails(subjectId) {
    const subject = SUBJECTS.find(s => s.id === subjectId);
    if (!subject) return;

    alert(`${subject.name}\n\nTopics:\n${subject.topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nWeightage: ${subject.weightage} marks`);
}

// ========================================
// Practice Questions
// ========================================
function renderPracticeSubjects() {
    const subjectSelect = document.getElementById('practiceSubjectSelect');

    subjectSelect.innerHTML = SUBJECTS.map(subject => `
        <button class="subject-select-btn" onclick="startPractice('${subject.id}')">
            ${subject.icon} ${subject.name}
        </button>
    `).join('');
}

function startPractice(subjectId) {
    appState.currentSubject = subjectId;
    appState.practiceQuestions = PRACTICE_QUESTIONS.filter(q => q.subject === subjectId);

    if (appState.practiceQuestions.length === 0) {
        alert('No practice questions available for this subject yet.');
        return;
    }

    // Shuffle questions
    appState.practiceQuestions = shuffleArray(appState.practiceQuestions);
    appState.currentQuestion = 0;

    document.getElementById('practiceQuestionCard').style.display = 'block';
    showPracticeQuestion();
    addActivity(`Started practicing ${SUBJECTS.find(s => s.id === subjectId).name}`);
}

function showPracticeQuestion() {
    const question = appState.practiceQuestions[appState.currentQuestion];
    if (!question) return;

    document.getElementById('currentQuestionNumber').textContent = appState.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionDifficulty').textContent = question.difficulty.toUpperCase();
    document.getElementById('questionDifficulty').className = `difficulty-badge ${question.difficulty}`;
    document.getElementById('solutionBox').style.display = 'none';

    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" onclick="selectOption(${index})">
            ${String.fromCharCode(65 + index)}. ${option}
        </div>
    `).join('');

    document.getElementById('solutionText').textContent = question.solution;
}

function selectOption(index) {
    const question = appState.practiceQuestions[appState.currentQuestion];
    const options = document.querySelectorAll('#questionOptions .option');

    // Remove previous selections
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });

    // Mark selected option
    options[index].classList.add('selected');

    // Check if correct
    if (index === question.correct) {
        options[index].classList.add('correct');
        appState.correctAnswers++;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    appState.questionsAttempted++;
    saveState();
    updateDashboard();
}

function showSolution() {
    const solutionBox = document.getElementById('solutionBox');
    solutionBox.style.display = solutionBox.style.display === 'none' ? 'block' : 'none';
}

function nextQuestion() {
    appState.currentQuestion++;

    if (appState.currentQuestion >= appState.practiceQuestions.length) {
        alert(`Practice session completed!\n\nQuestions attempted: ${appState.practiceQuestions.length}`);
        document.getElementById('practiceQuestionCard').style.display = 'none';
        appState.currentQuestion = 0;
        return;
    }

    showPracticeQuestion();
}

// ========================================
// Mock Tests
// ========================================
function renderMockTests() {
    const subjectTestsGrid = document.getElementById('subjectTestsGrid');

    subjectTestsGrid.innerHTML = SUBJECTS.map(subject => `
        <div class="card">
            <h3>${subject.icon} ${subject.name}</h3>
            <p>Subject-specific mock test</p>
            <ul class="test-info">
                <li>📝 10 Questions</li>
                <li>⏱️ 20 Minutes</li>
                <li>🎯 ${subject.weightage} Marks</li>
            </ul>
            <button class="btn btn-primary" onclick="startMockTest('${subject.id}')">Start Test</button>
        </div>
    `).join('');
}

function startMockTest(type) {
    let questions;
    let duration;
    let title;

    if (type === 'full') {
        // Full test with questions from all subjects
        questions = shuffleArray([...PRACTICE_QUESTIONS]).slice(0, 65);
        duration = 180 * 60; // 3 hours in seconds
        title = 'GATE CS Full Length Mock Test';
    } else {
        // Subject-specific test
        questions = PRACTICE_QUESTIONS.filter(q => q.subject === type).slice(0, 10);
        duration = 20 * 60; // 20 minutes
        const subject = SUBJECTS.find(s => s.id === type);
        title = `${subject.name} Mock Test`;
    }

    if (questions.length === 0) {
        alert('Not enough questions available for this test.');
        return;
    }

    appState.mockTest = {
        type,
        questions,
        currentQuestion: 0,
        answers: new Array(questions.length).fill(null),
        startTime: Date.now(),
        duration,
        timeLeft: duration
    };

    openModal('mockTestModal');
    document.getElementById('mockTestTitle').textContent = title;
    document.getElementById('testTotalQuestions').textContent = questions.length;
    startTestTimer();
    showTestQuestion();
    addActivity(`Started mock test: ${title}`);
}

function showTestQuestion() {
    const test = appState.mockTest;
    const question = test.questions[test.currentQuestion];

    document.getElementById('testQuestionNum').textContent = test.currentQuestion + 1;
    document.getElementById('testQuestionText').textContent = question.question;

    const optionsContainer = document.getElementById('testOptions');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option ${test.answers[test.currentQuestion] === index ? 'selected' : ''}" 
             onclick="selectTestOption(${index})">
            ${String.fromCharCode(65 + index)}. ${option}
        </div>
    `).join('');

    // Show/hide submit button on last question
    document.getElementById('submitTestBtn').style.display =
        test.currentQuestion === test.questions.length - 1 ? 'inline-flex' : 'none';
}

function selectTestOption(index) {
    appState.mockTest.answers[appState.mockTest.currentQuestion] = index;
    showTestQuestion();
}

function previousTestQuestion() {
    if (appState.mockTest.currentQuestion > 0) {
        appState.mockTest.currentQuestion--;
        showTestQuestion();
    }
}

function nextTestQuestion() {
    if (appState.mockTest.currentQuestion < appState.mockTest.questions.length - 1) {
        appState.mockTest.currentQuestion++;
        showTestQuestion();
    }
}

function startTestTimer() {
    const timerInterval = setInterval(() => {
        if (!appState.mockTest) {
            clearInterval(timerInterval);
            return;
        }

        appState.mockTest.timeLeft--;

        const minutes = Math.floor(appState.mockTest.timeLeft / 60);
        const seconds = appState.mockTest.timeLeft % 60;

        document.getElementById('testTimer').textContent =
            `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (appState.mockTest.timeLeft <= 0) {
            clearInterval(timerInterval);
            submitMockTest();
        }
    }, 1000);
}

function submitMockTest() {
    const test = appState.mockTest;

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    test.answers.forEach((answer, index) => {
        if (answer === null) {
            unattempted++;
        } else if (answer === test.questions[index].correct) {
            correct++;
        } else {
            incorrect++;
        }
    });

    const score = Math.round((correct / test.questions.length) * 100);

    // Update stats
    appState.mockTestsTaken++;
    appState.studyHours += (test.duration - test.timeLeft) / 3600;
    saveState();
    updateDashboard();

    // Show results
    closeModal('mockTestModal');
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultIncorrect').textContent = incorrect;
    document.getElementById('resultUnattempted').textContent = unattempted;
    openModal('resultsModal');

    addActivity(`Completed mock test - Score: ${score}%`);
    appState.mockTest = null;
}

// ========================================
// PYQs Section
// ========================================
function filterPYQs() {
    const yearFilter = document.getElementById('pyqYearFilter').value;
    const subjectFilter = document.getElementById('pyqSubjectFilter').value;

    let filteredQuestions = [...PYQ_QUESTIONS];

    if (yearFilter !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.year == yearFilter);
    }

    if (subjectFilter !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.subject === subjectFilter);
    }

    const questionsList = document.getElementById('pyqQuestionsList');

    if (filteredQuestions.length === 0) {
        questionsList.innerHTML = '<p class="empty-state">No questions found with selected filters</p>';
        return;
    }

    questionsList.innerHTML = filteredQuestions.map((q, index) => {
        const subject = SUBJECTS.find(s => s.id === q.subject);
        return `
            <div class="card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span class="difficulty-badge">${q.year}</span>
                    <span class="stat-text">${subject.name} • ${q.marks} marks</span>
                </div>
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">${q.question}</p>
                <div class="options-list">
                    ${q.options.map((opt, i) => `
                        <div class="option" onclick="this.classList.toggle('selected')">
                            ${String.fromCharCode(65 + i)}. ${opt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Formulas Section
// ========================================
function renderFormulas() {
    const formulasList = document.getElementById('formulasList');

    formulasList.innerHTML = FORMULAS.map(formulaSet => {
        const subject = SUBJECTS.find(s => s.id === formulaSet.subject);
        return `
            <div class="card">
                <h3>${subject.icon} ${formulaSet.category}</h3>
                <div style="margin-top: 1rem;">
                    ${formulaSet.formulas.map(formula => `
                        <div style="margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                            <h4 style="color: var(--primary-light); margin-bottom: 0.5rem;">${formula.name}</h4>
                            <p style="font-family: var(--font-mono); font-size: 0.95rem; margin: 0.5rem 0;">${formula.formula}</p>
                            <p class="stat-text"><strong>Example:</strong> ${formula.example}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function searchFormulas() {
    const searchTerm = document.getElementById('formulaSearch').value.toLowerCase();

    if (!searchTerm) {
        renderFormulas();
        return;
    }

    const filtered = FORMULAS.map(formulaSet => ({
        ...formulaSet,
        formulas: formulaSet.formulas.filter(f =>
            f.name.toLowerCase().includes(searchTerm) ||
            f.formula.toLowerCase().includes(searchTerm)
        )
    })).filter(set => set.formulas.length > 0);

    const formulasList = document.getElementById('formulasList');

    if (filtered.length === 0) {
        formulasList.innerHTML = '<p class="empty-state">No formulas found</p>';
        return;
    }

    formulasList.innerHTML = filtered.map(formulaSet => {
        const subject = SUBJECTS.find(s => s.id === formulaSet.subject);
        return `
            <div class="card">
                <h3>${subject.icon} ${formulaSet.category}</h3>
                <div style="margin-top: 1rem;">
                    ${formulaSet.formulas.map(formula => `
                        <div style="margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md);">
                            <h4 style="color: var(--primary-light); margin-bottom: 0.5rem;">${formula.name}</h4>
                            <p style="font-family: var(--font-mono); font-size: 0.95rem; margin: 0.5rem 0;">${formula.formula}</p>
                            <p class="stat-text"><strong>Example:</strong> ${formula.example}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// Pomodoro Timer
// ========================================
function setupPomodoroTimer() {
    // Setup SVG gradient for timer
    const svg = document.querySelector('.timer-svg');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'timerGradient');
    gradient.innerHTML = `
        <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    `;
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);

    updatePomodoroDisplay();
}

function startPomodoro() {
    if (appState.pomodoroTimer) {
        pausePomodoro();
        return;
    }

    const startBtn = document.getElementById('timerStartBtn');
    const resetBtn = document.getElementById('timerResetBtn');

    startBtn.textContent = 'Pause';
    resetBtn.style.display = 'inline-flex';

    let timeLeft = 25 * 60; // 25 minutes
    let isBreak = false;

    appState.pomodoroTimer = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        document.getElementById('timerMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = seconds.toString().padStart(2, '0');

        // Update progress circle
        const progress = document.getElementById('timerProgress');
        const totalTime = isBreak ? 5 * 60 : 25 * 60;
        const offset = 565 - (565 * timeLeft / totalTime);
        progress.style.strokeDashoffset = offset;

        if (timeLeft <= 0) {
            clearInterval(appState.pomodoroTimer);
            appState.pomodoroTimer = null;

            if (!isBreak) {
                // Completed a focus session
                appState.pomodoroSessions++;
                appState.studyHours += 0.42; // 25 minutes
                saveState();
                updatePomodoroStats();

                alert('Focus session completed! Time for a break.');
                addActivity('Completed Pomodoro session');

                // Start break
                isBreak = true;
                timeLeft = 5 * 60; // 5 minute break
                document.getElementById('timerPhase').textContent = 'Break Time';
                startPomodoro();
            } else {
                alert('Break over! Ready for another session?');
                resetPomodoro();
            }
        }
    }, 1000);
}

function pausePomodoro() {
    if (appState.pomodoroTimer) {
        clearInterval(appState.pomodoroTimer);
        appState.pomodoroTimer = null;
        document.getElementById('timerStartBtn').textContent = 'Resume';
    }
}

function resetPomodoro() {
    if (appState.pomodoroTimer) {
        clearInterval(appState.pomodoroTimer);
        appState.pomodoroTimer = null;
    }

    document.getElementById('timerMinutes').textContent = '25';
    document.getElementById('timerSeconds').textContent = '00';
    document.getElementById('timerStartBtn').textContent = 'Start';
    document.getElementById('timerResetBtn').style.display = 'none';
    document.getElementById('timerPhase').textContent = 'Focus Session';
    document.getElementById('timerProgress').style.strokeDashoffset = '0';
}

function updatePomodoroDisplay() {
    document.getElementById('pomodoroCount').textContent = appState.pomodoroSessions;
    document.getElementById('totalStudyTime').textContent = Math.floor(appState.studyHours) + 'h';
}

function updatePomodoroStats() {
    updatePomodoroDisplay();
    updateDashboard();
}

// ========================================
// Analytics
// ========================================
function renderAnalytics() {
    renderSubjectPerformance();
    renderWeakAreas();
    renderStreakCalendar();
    renderProgressOverview();
}

function renderSubjectPerformance() {
    const container = document.getElementById('subjectPerformance');

    const performance = SUBJECTS.map(subject => ({
        name: subject.name,
        progress: calculateSubjectProgress(subject.id)
    }));

    container.innerHTML = performance.map(perf => `
        <div class="performance-bar">
            <div class="performance-label">
                <span class="performance-name">${perf.name}</span>
                <span class="performance-value">${perf.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${perf.progress}%"></div>
            </div>
        </div>
    `).join('');
}

function renderWeakAreas() {
    const container = document.getElementById('weakAreas');

    const weakSubjects = SUBJECTS
        .map(subject => ({
            name: subject.name,
            progress: calculateSubjectProgress(subject.id),
            icon: subject.icon
        }))
        .filter(s => s.progress < 50)
        .sort((a, b) => a.progress - b.progress)
        .slice(0, 5);

    if (weakSubjects.length === 0) {
        container.innerHTML = '<p class="empty-state">Great job! No weak areas identified.</p>';
        return;
    }

    container.innerHTML = weakSubjects.map(subject => `
        <div class="activity-item">
            <span>${subject.icon} ${subject.name}</span>
            <span class="performance-value">${subject.progress}%</span>
        </div>
    `).join('');
}

function renderStreakCalendar() {
    const container = document.getElementById('streakCalendar');

    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🔥</div>
            <div style="font-size: 3rem; font-weight: 800; color: var(--primary-light);">${appState.streak}</div>
            <div class="stat-text">Day Streak</div>
        </div>
    `;
}

function renderProgressOverview() {
    const container = document.getElementById('progressOverview');

    const accuracy = appState.questionsAttempted > 0
        ? Math.round((appState.correctAnswers / appState.questionsAttempted) * 100)
        : 0;

    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-icon">📊</div>
                <div class="stat-info">
                    <p class="stat-number">${accuracy}%</p>
                    <p class="stat-text">Accuracy</p>
                </div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">⏱️</div>
                <div class="stat-info">
                    <p class="stat-number">${appState.pomodoroSessions}</p>
                    <p class="stat-text">Pomodoro Sessions</p>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// Streak Management
// ========================================
function checkDailyStreak() {
    const lastActive = localStorage.getItem('lastActiveDate');
    const today = new Date().toDateString();

    if (lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastActive === yesterday) {
            // Consecutive day - increase streak
            appState.streak++;
        } else if (lastActive) {
            // Streak broken
            appState.streak = 1;
        } else {
            // First time
            appState.streak = 1;
        }

        localStorage.setItem('lastActiveDate', today);
        saveState();
    }
}

// ========================================
// Modal Functions
// ========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========================================
// Utility Functions
// ========================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ========================================
// State Management
// ========================================
function saveState() {
    const stateToSave = {
        ...appState,
        completedTopics: Array.from(appState.completedTopics)
    };
    localStorage.setItem('gateCSAppState', JSON.stringify(stateToSave));
}

function loadState() {
    const saved = localStorage.getItem('gateCSAppState');
    if (saved) {
        const loaded = JSON.parse(saved);
        appState = {
            ...appState,
            ...loaded,
            completedTopics: new Set(loaded.completedTopics || []),
            pomodoroTimer: null // Don't restore active timer
        };
    }
}

// Save state periodically
setInterval(saveState, 30000); // Every 30 seconds

// Save state before page unload
window.addEventListener('beforeunload', saveState);
