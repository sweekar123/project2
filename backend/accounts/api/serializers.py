from accounts.models import User
from accounts.models import Gender
from rest_framework import serializers

# class GenderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Gender
#         fields = ['gender_type']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type':'password'},write_only=True,required=True)
    password1 = serializers.CharField(style={'input_type':'password'},write_only=True,required=True)
    class Meta:
        model = User
        fields = ['email','first_name','middle_name','last_name','phone_number','gender','password','password1']

    def validate(self,attrs):
        if attrs['password'] != attrs['password1']:
            return serializers.ValidationError("Password should match")
        return attrs

    def create(self,validated_data):
        print(validated_data)
        if "middle_name" in validated_data:
            user = User.objects.create_user(validated_data['email'],validated_data['password'])
            user.first_name = validated_data['first_name']
            user.middle_name = validated_data['middle_name']
            user.last_name = validated_data['last_name']
            user.phone_number = validated_data['phone_number']
            user.gender = validated_data['gender']
            user.save()
            return user
        else:
            user = User.objects.create_user(validated_data['email'],validated_data['password'])
            user.first_name = validated_data['first_name']
            user.last_name = validated_data['last_name']
            user.phone_number = validated_data['phone_number']
            user.gender = validated_data['gender']
            user.save()
            return user


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()



    

