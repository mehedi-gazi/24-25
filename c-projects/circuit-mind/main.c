// Main C File for Circuit Mind Game
// Author: Mehedi Gazi

#include <stdio.h>
#include <string.h>
#include "gates.h"

// Program entry point
int main() {
    printf("\n=== Circuit-Mind ===\n");
    printf("Choose puzzle type:\n");
    printf("[1] Basic puzzles\n");
    printf("[2] Advanced circuit puzzles\n");
    printf("[3] Free play mode\n");
    printf("Enter choice: ");

    char choice;
    scanf(" %c", &choice);

    if (choice == '1') {
        Puzzle puzzles[Max_Puzzles];
        int total_puzzles = load_puzzles("puzzles.txt", puzzles, Max_Puzzles);

        if (total_puzzles == 0) {
            printf("No puzzles loaded. Exiting.\n");
            return 1;
        }
        printf("Loaded %d puzzles.\n", total_puzzles);

        int start_level = load_progress();

        // Reset prompt
        printf("Progress: Puzzle %d\n", start_level + 1);
        printf("Do you want to reset your progress? [Y/N]: ");
        char reset_choice;
        scanf(" %c", &reset_choice);

        if (reset_choice == 'Y' || reset_choice == 'y') {
            save_progress(0);
            start_level = 0;
            printf("Progress has been reset. Starting from Puzzle 1.\n");
        }

        for (int i = start_level; i < total_puzzles; i++) {
            printf("\n=== Puzzle %d ===\n", i + 1);
            int status = play_puzzle(puzzles[i]);
            if (status == -1) {
                printf("Game exited early.\n");
                break;
            }
            save_progress(i + 1);
        }

    } else if (choice == '2') {
        CircuitPuzzle advanced_puzzle;

        if (!load_advanced_puzzle("advanced_puzzles.txt", &advanced_puzzle)) {
            printf("Failed to load advanced puzzle.\n");
            return 1;
        }

        play_circuit_puzzle(advanced_puzzle);

    } else if (choice == '3') {
        // Original free play mode
        Circuit current_circuit = {0};
        current_circuit.num_gates = 0;

        // Initialize all connections to -1 (no connection)
        for (int i = 0; i < MAX_GATES; i++) {
            current_circuit.connections[i][0] = -1;
            current_circuit.connections[i][1] = -1;
        }

        char fp_choice;
        while (1) {
            display_menu();
            scanf(" %c", &fp_choice);

            GateType type = get_gate_type_from_input(fp_choice);
            
            if (fp_choice == 'Q') {
                printf("Exiting free play mode.\n");
                break;
            }
            
            if (fp_choice == 'P') {
                char filename[100];
                printf("Enter puzzle filename: ");
                scanf("%99s", filename);
                
                Circuit puzzle = load_puzzle(filename);
                if (puzzle.num_gates > 0) {
                    printf("Puzzle loaded! Final output: %d\n", 
                           evaluate_circuit(&puzzle, puzzle.num_gates - 1));
                    current_circuit = puzzle;
                }
                continue;
            }
            
            if (fp_choice == 'S') {
                char filename[100];
                printf("Enter save filename: ");
                scanf("%99s", filename);
                
                save_circuit(&current_circuit, filename);
                printf("Circuit saved!\n");
                continue;
            }
            
            if (type == NONE) {
                printf("Invalid choice.\n");
                continue;
            }

            Gate gate;
            gate.type = type;

            printf("Enter input1 (0 or 1): ");
            gate.input1 = get_valid_bit();

            if (type != NOT) {
                printf("Enter input2 (0 or 1): ");
                gate.input2 = get_valid_bit();
            } else {
                gate.input2 = 0; // not used for NOT gate
            }

            // Add gate to current circuit
            if (current_circuit.num_gates < MAX_GATES) {
                current_circuit.gates[current_circuit.num_gates] = gate;
                current_circuit.num_gates++;
            }

            print_gate_result(gate);
        }
    } else {
        printf("Invalid choice.\n");
        return 1;
    }

    printf("Thanks for playing!\n");
    return 0;
}