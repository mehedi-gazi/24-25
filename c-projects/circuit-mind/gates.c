// Gates C File for functions and link to main.c
// Author: Mehedi Gazi

// Inc Libraries
#include <stdio.h>
#include "gates.h"

int evaluate_gate(Gate gate) {
    switch (gate.type) {
        case AND: return gate.input1 && gate.input2;
        case OR:  return gate.input1 | gate.input2;
        case XOR: return gate.input1 ^ gate.input2;
        case NOT: return !gate.input1;
        default:  return -1;
    }
}

void print_gate_result(Gate gate) {
    int output = evaluate_gate(gate);
    printf("Result: %d\n", output);
}

// Inst 3 Functionality of the Terminal when running the program
GateType get_gate_type_from_input(char input) {
    switch (input) {
        case 'A': return AND;
        case 'O': return OR;
        case 'X': return XOR;
        case 'N': return NOT;
        default:  return NONE;
    }
}

void display_menu() {
    printf("\n Choose a logic gate: \n");
    printf("[A] AND\n");
    printf("[O] OR\n");
    printf("[X] XOR\n");
    printf("[N] NOT\n");
    printf("[Q] Quit\n");
    printf("Enter your choice: ");
}

int evaluate_circuit_gate(Circuit *circuit, int gate_index, int *cache) {
    // cache stores computed gate outputs to avoid recomputation
    if (cache[gate_index] != -1) {
        return cache[gate_index];
    }

    Gate gate = circuit->gates[gate_index];
    int input1, input2;

    // Evaluate input1
    int conn1 = circuit->connections[gate_index][0];
    if (conn1 == -1) {
        input1 = gate.input1; // external input (user set)
    } else {
        input1 = evaluate_circuit_gate(circuit, conn1, cache);
    }

    // Evaluate input2
    int conn2 = circuit->connections[gate_index][1];
    if (conn2 == -1) {
        input2 = gate.input2; // external input (user set)
    } else {
        input2 = evaluate_circuit_gate(circuit, conn2, cache);
    }

    // Create a temp gate with evaluated inputs to reuse existing function
    Gate eval_gate = gate;
    eval_gate.input1 = input1;
    eval_gate.input2 = input2;

    int output = evaluate_gate(eval_gate);
    cache[gate_index] = output;
    return output;
}

int evaluate_circuit(Circuit *circuit, int final_gate_index) {
    int cache[MAX_GATES];
    for (int i = 0; i < MAX_GATES; i++) cache[i] = -1; // initialize cache with -1 (not computed)
    return evaluate_circuit_gate(circuit, final_gate_index, cache);
}


#include <string.h>  // for memset

// Evaluate a single gate in a circuit recursively
int evaluate_circuit_gate(Circuit *circuit, int gate_index, int *cache) {
    if (cache[gate_index] != -1) {
        return cache[gate_index];  // already evaluated
    }

    Gate gate = circuit->gates[gate_index];

    int input1, input2;

    // Get input1
    if (circuit->connections[gate_index][0] == -1) {
        input1 = gate.input1;
    } else {
        input1 = evaluate_circuit_gate(circuit, circuit->connections[gate_index][0], cache);
    }

    // Get input2 (if not NOT gate)
    if (gate.type == NOT) {
        input2 = 0;
    } else if (circuit->connections[gate_index][1] == -1) {
        input2 = gate.input2;
    } else {
        input2 = evaluate_circuit_gate(circuit, circuit->connections[gate_index][1], cache);
    }

    Gate eval_gate = { gate.type, input1, input2 };
    int result = evaluate_gate(eval_gate);
    cache[gate_index] = result;

    return result;
}

// Evaluation of the full circuit (returns output of final gate)
int evaluate_circuit(Circuit *circuit, int final_gate_index) {
    int cache[MAX_GATES];
    for (int i = 0; i < MAX_GATES; i++) cache[i] = -1;
    return evaluate_circuit_gate(circuit, final_gate_index, cache);
}

