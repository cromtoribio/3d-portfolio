uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying float vWobble;

void main() {
    // csm_Metalness = step( 0.0, sin(vUv.x * 100.0));
    // csm_Roughness = 1.0 - csm_Metalness;

    // Color Mix
    float colorMix = smoothstep(- 1.0, 1.0, vWobble);
    csm_DiffuseColor.rgb = mix(uColorA, uColorB, colorMix);

    // Shiny Tip
    csm_Roughness = 1.0 - colorMix;
}