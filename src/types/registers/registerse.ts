const registers = {
    "zero": "00000", // Zero register
    "0": "00000", // Zero register
    "at": "00001", // Assembler temporary
    "v0": "00010", // Values for results and expression evaluation
    "v1": "00011",
    "a0": "00100", // Arguments
    "a1": "00101",
    "a2": "00110",
    "a3": "00111",
    "t0": "01000", // Temporaries
    "t1": "01001",
    "t2": "01010",
    "t3": "01011",
    "t4": "01100",
    "t5": "01101",
    "t6": "01110",
    "t7": "01111",
    "s0": "10000", // Saved temporaries
    "s1": "10001",
    "s2": "10010",
    "s3": "10011",
    "s4": "10100",
    "s5": "10101",
    "s6": "10110",
    "s7": "10111",
    "t8": "11000", // More temporaries
    "t9": "11001",
    "k0": "11010", // Kernel registers
    "k1": "11011",
    "gp": "11100", // Global pointer
    "sp": "11101", // Stack pointer
    "fp": "11110", // Frame pointer
    "ra": "11111"  // Return address
}

export default registers;
