#version 330 core
out vec4 FragColor;

in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 objectColor;
uniform vec3 lightColor;

uniform bool blinnphong;
uniform int shine;

void main()
{
	float aStr = 0.1;
	vec3 a = aStr * lightColor;

	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float dv = max(dot(norm, lightDir), 0.0);
	vec3 d = dv * lightColor;

	float sStr = 1.0;
	vec3 viewDir = normalize(viewPos - FragPos);

	// testing Blinn-Phong here
	vec3 halfDir = normalize(lightDir + viewDir);

	vec3 reflectDir = reflect(-lightDir, norm);
	
	float spec;
	if (blinnphong)
		spec = pow(max(dot(halfDir, norm), 0.0), shine);
	else
		spec = pow(max(dot(viewDir, reflectDir), 0.0), shine);
	vec3 s = sStr * spec * lightColor;


	vec3 result = (a + d + s) * objectColor;
	FragColor = vec4(result, 1.0);
}