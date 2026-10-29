
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-productivity-tracker',
  standalone: true,
  templateUrl: './productivity-tracker.html',
  styleUrl: './productivity-tracker.css'
})
export class ProductivityTrackerComponent {

  readonly DAILY_GOAL = 5;

  // signal: nombre de tâches complétées
  completedTasks = signal(
    Number(localStorage.getItem('tasks')) || 0
  );

  // computed: pourcentage de progression
  progressPercentage = computed(() =>
    (this.completedTasks() / this.DAILY_GOAL) * 100
  );

  // computed: message
  message = computed(() => {
    const progress = this.progressPercentage();

    if (progress === 0) {
      return 'Prêt à démarrer la journée ?';
    }

    if (progress < 100) {
      return 'Continuez comme ça, vous y êtes presque !';
    }

    return 'Félicitations, objectif atteint !';
  });

  constructor() {
    // effect: sauvegarde dans localStorage
    effect(() => {
      const tasks = this.completedTasks();

      localStorage.setItem('tasks', tasks.toString());

      if (tasks >= this.DAILY_GOAL) {
        window.alert('Bravo, vous avez fini votre journée !');
      }
    });
  }

  // Ajouter une tâche
  addTask() {
    if (this.completedTasks() < this.DAILY_GOAL) {
      this.completedTasks.update(value => value + 1);
    }
  }

  // Réinitialiser
  resetTasks() {
    this.completedTasks.set(0);
  }
}
