#version 330 core
out vec4 FragColor;

in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 objectColor;
uniform vec3 lightColor;

void main()
{
	float aStr = 0.1;
	vec3 a = aStr * lightColor;

	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float dv = max(dot(norm, lightDir), 0.0);
	vec3 d = dv * lightColor;

	float sStr = 0.5;
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128);
	vec3 s = sStr * spec * lightColor;


	vec3 result = (a + d + s) * objectColor;
	FragColor = vec4(result, 1.0);
}