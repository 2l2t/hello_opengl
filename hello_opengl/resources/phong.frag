#version 330 core
out vec4 FragColor;

struct Material {
	sampler2D diffuse;
	sampler2D specular;
	sampler2D emission;
	float shininess;
};

struct DirLight {
	vec3 direction;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

struct PointLight {
	vec3 position;

	float constant;
	float linear;
	float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

struct SpotLight {
	vec3 position;
	vec3 direction;
	float cutOff;
	float outerCutOff;

	float constant;
	float linear;
	float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

#define NUM_POINT_LIGHTS 4

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;

uniform vec3 viewPos;
uniform DirLight dirLight;
uniform PointLight pointLights[NUM_POINT_LIGHTS];
uniform SpotLight spotLight;
uniform Material material;

uniform bool BlinnPhong;

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir);
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);
vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir);

void main()
{
	vec3 norm = normalize(Normal);
	vec3 viewDir = normalize(viewPos - FragPos);

	vec3 result = CalcDirLight(dirLight, norm, viewDir);

	for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
		result += CalcPointLight(pointLights[i], norm, FragPos, viewDir);
	}

	result += CalcSpotLight(spotLight, norm, FragPos, viewDir);

	FragColor = vec4(result, 1.0);
}

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir) {
	vec3 lightDir = normalize(-light.direction);

	float dv = max(dot(normal, lightDir), 0.0);

	vec3 reflectDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	
	vec3 a = light.ambient * vec3(texture(material.diffuse, TexCoords));
	vec3 d = light.diffuse * dv * vec3(texture(material.diffuse, TexCoords));
	vec3 s = light.specular * spec * vec3(texture(material.specular, TexCoords));
	vec3 e = vec3(texture(material.emission, TexCoords));
	return vec3(a + d + s + e);
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir) {
	vec3 lightDir = normalize(light.position - fragPos);
	
	float dv = max(dot(normal, lightDir), 0.0);

	float spec = 0.0f;
	if (BlinnPhong) {
		vec3 halfDir = normalize(lightDir + viewDir);
		float spec = pow(max(dot(halfDir, normal), 0.0), material.shininess * 4.0);
	} else {
		vec3 reflectDir = reflect(-lightDir, normal);
		float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	}

	float distance = length(light.position - FragPos);
	float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));

	vec3 a = attenuation * light.ambient * vec3(texture(material.diffuse, TexCoords));
	vec3 d = attenuation * light.diffuse * (dv * vec3(texture(material.diffuse, TexCoords)));
	vec3 s = attenuation * light.specular * (spec * vec3(texture(material.specular, TexCoords)));
	
	return vec3(a + d + s);
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir) {
	vec3 lightDir = normalize(light.position - fragPos);

	float dv = max(dot(normal, lightDir), 0.0);

	float spec = 0.0f;
	if (BlinnPhong) {
		vec3 halfDir = normalize(lightDir + viewDir);
		float spec = pow(max(dot(halfDir, normal), 0.0), material.shininess * 4.0);
	} else {
		vec3 reflectDir = reflect(-lightDir, normal);
		float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	}

	float distance = length(light.position - fragPos);
	float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));

	float theta = dot(lightDir, normalize(-light.direction));
	float epsilon = light.cutOff - light.outerCutOff;
	float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);

	vec3 a = attenuation * intensity * light.ambient * vec3(texture(material.diffuse, TexCoords));
	vec3 d = attenuation * intensity * light.diffuse * (dv * vec3(texture(material.diffuse, TexCoords)));
	vec3 s = attenuation * intensity * light.specular * (spec * vec3(texture(material.specular, TexCoords)));
	
	return (a + d + s);
}
