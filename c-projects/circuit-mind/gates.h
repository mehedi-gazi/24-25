// Contains Gate Module and Definitions for Circuit Mind Game
// Author : Mehedi Gazi

// Inc Libraries
#ifndef GATES_H
#define GATES_H

// Constants (Max limitation for gates)
#define MAX_GATES 10
#define Max_Puzzles 20

// Define Protypes and Structs
typedef enum {
    AND,
    OR,
    XOR,
    NOT,
    NONE
} GateType;

typedef struct {
    GateType type;
    int input1;
    int input2;
} Gate;

// Basic Puzzle Structure
typedef struct {
    int input1;
    int input2;
    GateType gate_type;
    int expected_result;
} Puzzle;

// Multiple Gates and Circuit Structure for the advanced circuit mind game
// Circuit Structure to hold multiple gates and their connections
typedef struct {
    Gate gates[MAX_GATES];       // Array of gates in the circuit
    int connections[MAX_GATES][2]; // Connections for each gate's inputs
                                  // connections[i][0] = index of gate that feeds input1 of gate i, -1 if external input
                                  // connections[i][1] = index of gate that feeds input2 of gate i, -1 if external input
    int num_gates;
} Circuit;

// Advanced puzzle structure
typedef struct {
    Circuit circuit;
    int input_count;
    int expected_output;
} CircuitPuzzle;

// Function declarations
int evaluate_gate(Gate gate);
void print_gate_result(Gate gate);
GateType get_gate_type_from_input(char input);
void display_menu(void);
int evaluate_circuit_gate(Circuit *circuit, int gate_index, int *cache);
int evaluate_circuit(Circuit *circuit, int final_gate_index);

// Additional function declarations for file operations
Circuit load_puzzle(const char* filename);
void save_circuit(Circuit* circuit, const char* filename);

// Input validation
int get_valid_bit(void);

// New puzzle system functions
int load_puzzles(const char* filename, Puzzle puzzles[], int max_puzzles);
int load_progress(void);
void save_progress(int level);
int play_puzzle(Puzzle puzzle);
int load_advanced_puzzle(const char* filename, CircuitPuzzle* puzzle);
void play_circuit_puzzle(CircuitPuzzle puzzle);

#endif