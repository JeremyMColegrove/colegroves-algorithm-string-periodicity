# colegrove-s-algorithm-string-periodicity

Algorithm Analysis: GCD-Based Repeating Substring Detection

### **1. Mathematical Proof of Correctness**

**Hypothesis**: For a string $S$ of length $N$, if $S$ is formed by repeating a substring $P$ exactly $k$ times (i.e., $S = P^k$), then the repetition count $k$ must be a divisor of the Greatest Common Divisor ($G$) of the character frequencies of $S$.

**Proof**: 
1. Frequency Definition: Let $freq(c, S)$ be the number of occurrences of character $c$ in string $S$.
2. Repetition Property: If $S$ is composed of $P$ repeated $k$ times, then for every character $c$ in the alphabet: 
```math
freq(c, S) = k \times freq(c, P)
```
3. Divisibility: From the equation above, $freq(c, S)$ is divisible by $k$ for all characters $c$.
4. GCD Definition: The Greatest Common Divisor $G$ of a set of numbers is the largest integer that divides all numbers in that set. Since $k$ divides every $freq(c, S)$, $k$ must be a common divisor of the set of frequencies.
5. Conclusion: Therefore, $k$ must divide $G$. 
```math
G \pmod k \equiv 0
```
**Implication for the Algorithm**:
We do not need to test every possible substring length. We only need to test repetition counts $k$ that are divisors of $G$. If a valid repeating substring exists, its repetition count will be found within the factors of $G$. 

### **2. Time Complexity Analysis**:

The algorithm operates in four distinct phases:

#### **Phase 1: Frequency Map Construction**

Iterating over the string to count characters.
_Cost_: $O(N)$

#### **Phase 2: GCD Computation**
Calculating the GCD of the frequency values.
_Cost_: Negligible ($O(|\Sigma|)$).

#### **Phase 3 & 4: The Divisor Loop and Validation**
We iterate through all divisors of $G$ and perform a check of cost $O(N)$ for each.
_Cost_: $O(N \times d(G))$Where $d(G)$ is the number of divisors of the GCD.

#### **Total Time Complexity Calculation**

The maximum number of divisors for any integer $N$ is bounded by:
```math
d(N) \approx N^{\frac{1}{\ln \ln N}}
```
Therefore, the total complexity is:
```math
\text{Total} = N \times d(N) \\
\text{Total} \approx N^1 \times N^{\frac{1}{\ln \ln N}} \\
\text{Total} \approx N^{1 + \frac{1}{\ln \ln N}}
```

### **3. Space Complexity**
**Map Storage**: $O(|\Sigma|)$ to store character counts.**Auxiliary**: $O(1)$ for loop variables.Total: $O(1)$ (constant space relative to alphabet size).