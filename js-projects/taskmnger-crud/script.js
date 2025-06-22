// Task Manager - Pure JavaScript Implementation
class TaskManager {
  constructor() {
    this.tasks = []
    this.filteredTasks = []
    this.editingTaskId = null

    // DOM elements
    this.elements = {
      // Stats
      totalTasks: document.getElementById("total-tasks"),
      completedTasks: document.getElementById("completed-tasks"),
      completionRate: document.getElementById("completion-rate"),

      // Controls
      searchInput: document.getElementById("search-input"),
      categoryFilter: document.getElementById("category-filter"),
      statusFilter: document.getElementById("status-filter"),
      addTaskBtn: document.getElementById("add-task-btn"),

      // Modal
      modal: document.getElementById("task-modal"),
      modalTitle: document.getElementById("modal-title"),
      closeModal: document.getElementById("close-modal"),
      cancelBtn: document.getElementById("cancel-btn"),

      // Form
      taskForm: document.getElementById("task-form"),
      taskTitle: document.getElementById("task-title"),
      taskDescription: document.getElementById("task-description"),
      taskCategory: document.getElementById("task-category"),
      taskPriority: document.getElementById("task-priority"),
      taskDueDate: document.getElementById("task-due-date"),
      submitBtn: document.getElementById("submit-btn"),

      // Tasks
      tasksContainer: document.getElementById("tasks-container"),
      noTasks: document.getElementById("no-tasks"),
    }

    this.init()
  }

  init() {
    this.loadTasks()
    this.bindEvents()
    this.updateStats()
    this.renderTasks()
  }

  // Event Listeners
  bindEvents() {
    // Modal controls
    this.elements.addTaskBtn.addEventListener("click", () => this.openModal())
    this.elements.closeModal.addEventListener("click", () => this.closeModal())
    this.elements.cancelBtn.addEventListener("click", () => this.closeModal())

    // Form submission
    this.elements.taskForm.addEventListener("submit", (e) => this.handleSubmit(e))

    // Search and filters
    this.elements.searchInput.addEventListener("input", () => this.applyFilters())
    this.elements.categoryFilter.addEventListener("change", () => this.applyFilters())
    this.elements.statusFilter.addEventListener("change", () => this.applyFilters())

    // Close modal when clicking outside
    this.elements.modal.addEventListener("click", (e) => {
      if (e.target === this.elements.modal) {
        this.closeModal()
      }
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal()
      }
    })
  }

  // Local Storage
  loadTasks() {
    const savedTasks = localStorage.getItem("taskManagerTasks")
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
      this.filteredTasks = [...this.tasks]
    }
  }

  saveTasks() {
    localStorage.setItem("taskManagerTasks", JSON.stringify(this.tasks))
  }

  // Task Operations
  createTask(taskData) {
    const task = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      category: taskData.category,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    this.tasks.unshift(task) // Add to beginning
    this.saveTasks()
    this.applyFilters()
    this.updateStats()
  }

  updateTask(taskId, taskData) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        category: taskData.category,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
      }

      this.saveTasks()
      this.applyFilters()
      this.updateStats()
    }
  }

  deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.saveTasks()
      this.applyFilters()
      this.updateStats()
    }
  }

  toggleTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId)
    if (task) {
      task.completed = !task.completed
      this.saveTasks()
      this.applyFilters()
      this.updateStats()
    }
  }

  // Modal Operations
  openModal(task = null) {
    this.editingTaskId = task ? task.id : null

    if (task) {
      // Edit mode
      this.elements.modalTitle.textContent = "Edit Task"
      this.elements.submitBtn.textContent = "Update Task"
      this.populateForm(task)
    } else {
      // Add mode
      this.elements.modalTitle.textContent = "Add New Task"
      this.elements.submitBtn.textContent = "Add Task"
      this.resetForm()
    }

    this.elements.modal.style.display = "block"
    this.elements.taskTitle.focus()
  }

  closeModal() {
    this.elements.modal.style.display = "none"
    this.editingTaskId = null
    this.resetForm()
  }

  populateForm(task) {
    this.elements.taskTitle.value = task.title
    this.elements.taskDescription.value = task.description
    this.elements.taskCategory.value = task.category
    this.elements.taskPriority.value = task.priority
    this.elements.taskDueDate.value = task.dueDate
  }

  resetForm() {
    this.elements.taskForm.reset()
    this.elements.taskPriority.value = "medium"
    this.elements.taskCategory.value = "Personal"
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.elements.taskForm)
    const taskData = {
      title: this.elements.taskTitle.value,
      description: this.elements.taskDescription.value,
      category: this.elements.taskCategory.value,
      priority: this.elements.taskPriority.value,
      dueDate: this.elements.taskDueDate.value,
    }

    if (!taskData.title.trim()) {
      alert("Please enter a task title")
      return
    }

    if (this.editingTaskId) {
      this.updateTask(this.editingTaskId, taskData)
    } else {
      this.createTask(taskData)
    }

    this.closeModal()
  }

  // Filtering and Search
  applyFilters() {
    const searchTerm = this.elements.searchInput.value.toLowerCase()
    const categoryFilter = this.elements.categoryFilter.value
    const statusFilter = this.elements.statusFilter.value

    this.filteredTasks = this.tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)

      // Category filter
      const matchesCategory = categoryFilter === "all" || task.category === categoryFilter

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "pending" && !task.completed)

      return matchesSearch && matchesCategory && matchesStatus
    })

    this.renderTasks()
  }

  // Rendering
  updateStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter((task) => task.completed).length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    this.elements.totalTasks.textContent = total
    this.elements.completedTasks.textContent = completed
    this.elements.completionRate.textContent = `${completionRate}%`
  }

  renderTasks() {
    const container = this.elements.tasksContainer

    if (this.filteredTasks.length === 0) {
      this.elements.noTasks.style.display = "block"
      // Remove existing task cards
      const taskCards = container.querySelectorAll(".task-card")
      taskCards.forEach((card) => card.remove())
      return
    }

    this.elements.noTasks.style.display = "none"

    // Clear existing tasks
    const taskCards = container.querySelectorAll(".task-card")
    taskCards.forEach((card) => card.remove())

    // Render filtered tasks
    this.filteredTasks.forEach((task) => {
      const taskElement = this.createTaskElement(task)
      container.appendChild(taskElement)
    })
  }

  createTaskElement(task) {
    const taskCard = document.createElement("div")
    taskCard.className = `task-card ${task.completed ? "completed" : ""}`

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

    taskCard.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} 
                       onchange="taskManager.toggleTask('${task.id}')">
                <div class="task-content">
                    <h3 class="task-title ${task.completed ? "completed" : ""}">${this.escapeHtml(task.title)}</h3>
                    ${task.description ? `<p class="task-description ${task.completed ? "completed" : ""}">${this.escapeHtml(task.description)}</p>` : ""}
                    <div class="task-meta">
                        <span class="badge badge-category">${task.category}</span>
                        <span class="badge badge-priority-${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                        ${task.dueDate ? `<span class="badge ${isOverdue ? "badge-overdue" : "badge-due-date"}">📅 ${this.formatDate(task.dueDate)}</span>` : ""}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn" onclick="taskManager.openModal(taskManager.getTask('${task.id}'))" title="Edit Task">
                        ✏️
                    </button>
                    <button class="action-btn delete" onclick="taskManager.deleteTask('${task.id}')" title="Delete Task">
                        🗑️
                    </button>
                </div>
            </div>
        `

    return taskCard
  }

  // Utility Methods
  getTask(taskId) {
    return this.tasks.find((task) => task.id === taskId)
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }
}

// Initialize the Task Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.taskManager = new TaskManager()
})

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = TaskManager
}
