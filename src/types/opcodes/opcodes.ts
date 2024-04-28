const opcodes = {
    "add": "000000",
    "addu": "000000",
    "addi": "001000",
    "addiu": "001001",
    "and": "000000",
    "andi": "001100",
    "div": "000000",
    "divu": "000000",
    "mult": "000000",
    "multu": "000000",
    "nor": "000000",
    "or": "000000",
    "ori": "001101",
    "sll": "000000",
    "sllv": "000000",
    "sra": "000000",
    "srav": "000000",
    "srl": "000000",
    "srlv": "000000",
    "sub": "000000",
    "subu": "000000",
    "xor": "000000",
    "xori": "001110",
    "lhi": "011001",
    "llo": "011000",
    "slt": "000000",
    "sltu": "000000",
    "slti": "001010",
    "sltiu": "001001",
    "beq": "000100",
    "bgtz": "000111",
    "blez": "000110",
    "bne": "000101",
    "j": "000010",
    "jal": "000011",
    "jalr": "001001",
    "jr": "001000",
    "lb": "100000",
    "lbu": "100100",
    "lh": "100001",
    "lhu": "100101",
    "lw": "100011",
    "sb": "101000",
    "sh": "101001",
    "sw": "101011",
    "mfhi": "010000",
    "mflo": "010010",
    "mthi": "010001",
    "mtlo": "010011",
    "trap": "011010",
    "lui": "001111"
};


export default opcodes