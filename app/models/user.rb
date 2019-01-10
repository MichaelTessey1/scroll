class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true
  
  has_many :comments
  has_many :posts
  has_one_attached :avatar

  def to_token_payload
    {
      sub: id,
      email: email,
      username: username
    }
  end
  
end
