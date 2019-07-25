class CreateSources < ActiveRecord::Migration[5.2]
  def change
    create_table :sources do |t|
      t.string :api_id
      t.string :name
      t.string :description
      t.string :url
      t.string :category
      t.string :language
      t.string :country

      t.timestamps
    end
  end
end
