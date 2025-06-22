#include <stdio.h>
#include <assert.h>
#include "gates.h"

// Test basic gate logic
void test_gate_evaluation() {
    printf("Testing basic gate evaluation...\n");
    
    // Test AND gate
    Gate and_gate1 = {AND, 1, 1};
    Gate and_gate2 = {AND, 1, 0};
    Gate and_gate3 = {AND, 0, 1};
    Gate and_gate4 = {AND, 0, 0};
    
    assert(evaluate_gate(and_gate1) == 1);
    assert(evaluate_gate(and_gate2) == 0);
    assert(evaluate_gate(and_gate3) == 0);
    assert(evaluate_gate(and_gate4) == 0);
    
    // Test OR gate
    Gate or_gate1 = {OR, 1, 1};
    Gate or_gate2 = {OR, 1, 0};
    Gate or_gate3 = {OR, 0, 1};
    Gate or_gate4 = {OR, 0, 0};
    
    assert(evaluate_gate(or_gate1) == 1);
    assert(evaluate_gate(or_gate2) == 1);
    assert(evaluate_gate(or_gate3) == 1);
    assert(evaluate_gate(or_gate4) == 0);
    
    // Test XOR gate
    Gate xor_gate1 = {XOR, 1, 1};
    Gate xor_gate2 = {XOR, 1, 0};
    Gate xor_gate3 = {XOR, 0, 1};
    Gate xor_gate4 = {XOR, 0, 0};
    
    assert(evaluate_gate(xor_gate1) == 0);
    assert(evaluate_gate(xor_gate2) == 1);
    assert(evaluate_gate(xor_gate3) == 1);
    assert(evaluate_gate(xor_gate4) == 0);
    
    // Test NOT gate
    Gate not_gate1 = {NOT, 1, 0};
    Gate not_gate2 = {NOT, 0, 0};
    
    assert(evaluate_gate(not_gate1) == 0);
    assert(evaluate_gate(not_gate2) == 1);
    
    printf("✓ Basic gate evaluation tests passed!\n");
}

// Test circuit evaluation
void test_circuit_evaluation() {
    printf("Testing circuit evaluation...\n");
    
    // Create a simple circuit: A AND B
    Circuit circuit1 = {0};
    circuit1.num_gates = 1;
    circuit1.gates[0].type = AND;
    circuit1.gates[0].input1 = 1;
    circuit1.gates[0].input2 = 1;
    circuit1.connections[0][0] = -1; // External input
    circuit1.connections[0][1] = -1; // External input
    
    assert(evaluate_circuit(&circuit1, 0) == 1);
    
    // Create a more complex circuit: (A AND B) OR (NOT C)
    Circuit circuit2 = {0};
    circuit2.num_gates = 3;
    
    // Gate 0: A AND B
    circuit2.gates[0].type = AND;
    circuit2.gates[0].input1 = 1;
    circuit2.gates[0].input2 = 0;
    circuit2.connections[0][0] = -1; // External input
    circuit2.connections[0][1] = -1; // External input
    
    // Gate 1: NOT C
    circuit2.gates[1].type = NOT;
    circuit2.gates[1].input1 = 0;
    circuit2.connections[1][0] = -1; // External input
    circuit2.connections[1][1] = -1; // Not used
    
    // Gate 2: (Gate 0) OR (Gate 1)
    circuit2.gates[2].type = OR;
    circuit2.gates[2].input1 = 0; // Not used directly
    circuit2.gates[2].input2 = 0; // Not used directly
    circuit2.connections[2][0] = 0; // Connected to Gate 0 output
    circuit2.connections[2][1] = 1; // Connected to Gate 1 output
    
    assert(evaluate_circuit(&circuit2, 2) == 1);
    
    printf("✓ Circuit evaluation tests passed!\n");
}

int main() {
    printf("\n===== Circuit Mind Unit Tests =====\n\n");
    
    test_gate_evaluation();
    test_circuit_evaluation();
    
    printf("\nAll tests passed successfully!\n");
    return 0;
}