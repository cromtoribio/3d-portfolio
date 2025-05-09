attribute vec4 tangent;

uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

uniform float uWarpedPositionFrequency;
uniform float uWarpedTimeFrequency;
uniform float uWarpedStrength;

#include ../includes/simplexNoise4d.glsl

varying vec2 vUv;
varying float vWobble;

float getWobble(vec3 position) {

    vec3 warpedPosition = position;
    warpedPosition += simplexNoise4d(vec4(
        position * uWarpedPositionFrequency, 
        uTime * uWarpedTimeFrequency
    )) * uWarpedStrength;

    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency, // XYZ
        uTime * uTimeFrequency // Time (W)
    )) * uStrength;
}

void main() {

    vec3 biTangent = cross(normal, tangent.xyz);

    // Neighbors positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent * shift;


    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;

    // Compute Normal
    vec3 toA = normalize (positionA - csm_Position);
    vec3 toB = normalize (positionB - csm_Position);

    csm_Normal = cross(toA, toB);
    

    // Varyings
    vUv = uv;
    vWobble = wobble / uStrength;
}