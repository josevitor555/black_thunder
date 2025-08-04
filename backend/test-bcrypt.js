import bcrypt from "bcryptjs";

// Teste básico do bcrypt
async function testBcrypt() {
    const testPassword = "test123";
    
    console.log("=== Teste do bcrypt ===");
    console.log("Senha original:", testPassword);
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log("Senha hasheada:", hashedPassword);
    console.log("Tamanho do hash:", hashedPassword.length);
    
    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log("Comparação correta:", isMatch);
    
    // Verificar com senha incorreta
    const isWrongMatch = await bcrypt.compare("wrongpassword", hashedPassword);
    console.log("Comparação incorreta:", isWrongMatch);
    
    // Teste com senha vazia
    const emptyHash = await bcrypt.hash("", 10);
    console.log("Hash de senha vazia:", emptyHash);
    const emptyMatch = await bcrypt.compare("", emptyHash);
    console.log("Comparação com senha vazia:", emptyMatch);
    
    // Teste com senha undefined
    try {
        const undefinedHash = await bcrypt.hash(undefined, 10);
        console.log("Hash de undefined:", undefinedHash);
    } catch (error) {
        console.log("Erro ao hashear undefined:", error.message);
    }
    
    // Teste com hash undefined
    try {
        const undefinedMatch = await bcrypt.compare("test", undefined);
        console.log("Comparação com hash undefined:", undefinedMatch);
    } catch (error) {
        console.log("Erro ao comparar com hash undefined:", error.message);
    }
}

testBcrypt().catch(console.error); 